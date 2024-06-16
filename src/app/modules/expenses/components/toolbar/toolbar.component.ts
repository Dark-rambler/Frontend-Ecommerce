import { Component } from '@angular/core';
import { buttons } from 'src/app/core/constants/labels';
import { ModalDeleteComponent } from 'src/app/shared/components/modal-delete/modal-delete.component';
import { ModalInformationComponent } from 'src/app/shared/components/modal-information/modal-information.component';
import { ExpensesService } from '../../services/expenses.service';
import { Table } from 'primeng/table';
import { ModalFormsComponent } from '../modal-forms/modal-forms.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],

})
export class ToolbarComponent {
  public buttons = buttons;
  public tableComponent: any;
  public modalInfoComponent: ModalInformationComponent;
  public modalFormComponent: ModalFormsComponent;
  public modalDeleteComponent: ModalDeleteComponent;

  constructor(private expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.initializeModalsListeners();
  }
  public create() {
    this.modalFormComponent.openCreate();
  }
  public edit() {
    this.modalFormComponent.openEdit();
  }
  public deleteSelected() {
    this.modalDeleteComponent.confirmDelete();
  }
  public info() {
     this.modalInfoComponent.openInfo();
  }
  private initializeModalsListeners() {
    this.expensesService.triggerTable.subscribe((response: Table) => {
      console.log(response);

      this.tableComponent = response;
    });

    this.expensesService.triggerInfo.subscribe((response: ModalInformationComponent) => {
      console.log(response);

      this.modalInfoComponent = response;
    });

    this.expensesService.triggerDelete.subscribe((response: ModalDeleteComponent) => {
      console.log(response);

      this.modalDeleteComponent = response;
    });

    this.expensesService.trigger.subscribe((response: ModalFormsComponent) => {
      console.log(response);

      this.modalFormComponent = response;
    });
  }

}
