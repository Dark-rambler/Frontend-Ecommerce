import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { tittles } from 'src/app/core/constants/labels';
import { ModalFormComponent } from '../../modal-form/modal-form.component';
import { ProductViewService } from 'src/app/modules/store/services/product-view.service';
import { StoreMannagerService } from '../../services/store-mannager.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  public tittles = tittles;
  public items: MenuItem[] | undefined;
  public modalForm!: ModalFormComponent;

  constructor(private storeMannagerService: StoreMannagerService) { }

  ngOnInit() {
    this.initializeValues();
    this.initializeListenners();
  }

  public save() {
    this.modalForm.openCreate();
  }
  public edit() {
    this.modalForm.openEdit();
  }
  public delete() {
    console.log('delete');
  }
  public info() {
    console.log('update');
  }

  private initializeValues() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ];
  }
  private initializeListenners() {
    this.storeMannagerService.trigger.subscribe((modalForm: ModalFormComponent) => {
      this.modalForm = modalForm;
    });
  }

}
