import { Component, Input } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { messages } from 'src/app/core/constants/messages';
import { HelpersService } from 'src/app/core/services/helpers.service';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent {
  @Input() serviceObject: any;
  @Input() fromGeneralToolbar: boolean = true;
  @Input({ required: false }) valueMessage: string;

  public object: any;
  public messages = messages;
  private tableComponent: any;
  public dialog: boolean = false;

  constructor(private helpersService: HelpersService) {}

  ngOnInit() {
    this.serviceObject.triggerDelete.emit(this);
    this.serviceObject.triggerTable.subscribe((tableComponent: any) => {
      this.tableComponent = tableComponent;
    });

    if (this.fromGeneralToolbar) {
      this.serviceObject
        .getSelectedData()
        .subscribe((response: typeof this.object) => {
          this.object = response;
        });
    }
  }

  public openConfirm(data?: any) {
    if (data) {
      this.object = data;
    }
    if (this.object && this.object.id) {
      this.openDialog(true);
    } else {
      this.helpersService.messageNotification(
        'info',
        messages.requiredSelection
      );
    }
  }

  public confirmDelete() {
    this.openDialog(false);
    this.serviceObject
      .delete(parseInt(this.object.id))
      .pipe(
        tap(() => {
          this.tableComponent.reload();
          this.fromGeneralToolbar
            ? this.helpersService.messageNotification(
                'success',
                messages.successDelete
              )
            : this.tableComponent.showMessage(
                'success',
                messages.successDelete
              );
          this.tableComponent.onRowUnselect(null);
        }),
        catchError(async (err) => {
          this.helpersService.messageNotification('error', err[0]);
        })
      )
      .subscribe();
  }

  public openDialog(state: boolean) {
    this.dialog = state;
  }
}
