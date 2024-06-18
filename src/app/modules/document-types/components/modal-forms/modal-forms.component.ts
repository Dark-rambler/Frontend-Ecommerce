import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { buttons, labels, tittles } from 'src/app/core/constants/labels';
import { messages } from 'src/app/core/constants/messages';
import { TableComponent } from '../table/table.component';
import { DocumentTypesService } from '../../services/document-types.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { FormUtils } from 'src/app/core/utils/form-groups';
import { DocumentType } from 'src/app/core/model/document-type';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-modal-forms',
  templateUrl: './modal-forms.component.html',
  styleUrls: ['./modal-forms.component.scss']
})
export class ModalFormsComponent {

  public messages = messages;
  public labels = labels;
  public buttons = buttons;
  public formPSGroups: FormGroup;
  public tittleForm: string = "";
  public dialog: boolean = false;
  public submitted: boolean = false;

  private expense!: DocumentType;
  private expenseResponse: any;
  private tableComponent!: TableComponent;

  constructor(
    private documentTypesService: DocumentTypesService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.waitForPSGroupSelection();
    this.documentTypesService.trigger.emit(this);
    this.registerTableComponentListener();
    this.formPSGroups = FormUtils.getDefaultDocumentTypeFormGroup();
  }

  public openCreate() {
    this.reset();
    this.tittleForm = tittles.create;
    this.openDialog(true, false);
  }

  public openEdit() {
    this.tittleForm = tittles.edit;
    if (this.expenseResponse && this.expenseResponse.id) {
      this.documentTypesService
        .findById(parseInt(this.expenseResponse.id))
        .pipe(
          tap((expense: any) => {
            this.expense = expense;
            this.updateFormValues(expense);
            this.openDialog(true);
          })
        )
        .subscribe();
    } else {
      this.helpersService.messageNotification('info', messages.requiredSelection);
    }
  }

  public openDialog(state: any, stateSubmitted?: any) {
    this.dialog = state;
    this.submitted = stateSubmitted;
  }

  public save() {
    this.submitted = true;

    if (this.formPSGroups.valid) {
      this.expense.id
        ? this.submit('update', this.expense.id)
        : this.submit('create');
    }
  }

  private submit(action: 'create' | 'update', expenseId?: number): void {
    let data: DocumentType = {
      ...this.formPSGroups.value,
    };
    const serviceObservable =
      action === 'create'
        ? this.documentTypesService.create(data)
        : this.documentTypesService.update(expenseId!, data);

    serviceObservable
      .pipe(
        tap(() => {
          this.openDialog(false);
          let successMessage = messages.successUpdate;
          if (action === 'create') {
            successMessage = messages.successCreate;
          } else {
            this.tableComponent.sendSelectedProgrammaticStructure(data);
          }
          this.displayMessage('success', successMessage);
          this.tableComponent.reload();
          this.reset();
        }),
        catchError((err) => {
          return of('error', this.displayMessage('error', err.message));
        })
      )
      .subscribe();
  }

  private reset(): void {
    this.formPSGroups = FormUtils.getDefaultDocumentTypeFormGroup();
    this.expense = new DocumentType();
  }

  private displayMessage(type: string, error: string) {
    this.helpersService.messageNotification(type, error);
  }

  private waitForPSGroupSelection() {
    this.documentTypesService
      .getSelectedData()
      .subscribe((response: DocumentType) => {
        this.expenseResponse = response;
      });
  }

  private registerTableComponentListener() {
    this.documentTypesService
      .triggerTable
      .subscribe((tableComponent: TableComponent) => {
        this.tableComponent = tableComponent;
      });
  }

  private updateFormValues(psGroup: DocumentType) {
    this.formPSGroups.patchValue(psGroup);
  }
}
