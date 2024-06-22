import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { buttons, labels, tittles } from 'src/app/core/constants/labels';
import { messages } from 'src/app/core/constants/messages';
import { Income } from 'src/app/core/model/income';
import { TableComponent } from '../table/table.component';
import { IncomesService } from '../../services/incomes.service';
import { DocumentTypesService } from 'src/app/modules/document-types/services/document-types.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { FormUtils } from 'src/app/core/utils/form-groups';
import { catchError, of, tap } from 'rxjs';
import { DocumentType } from 'src/app/core/model/document-type';

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
  public documentTypes: DocumentType[] = [];
  private isIncomeTransaction:boolean =true;
  private expense!: Income;
  private expenseResponse: any;
  private tableComponent!: TableComponent;

  constructor(
    private incomesService: IncomesService,
    private documentTypesService: DocumentTypesService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.waitForPSGroupSelection();
    this.incomesService.trigger.emit(this);
    this.registerTableComponentListener();
    this.formPSGroups = FormUtils.getDefaultDocumentTypeFormGroup();
  }

  public openCreate() {
    this.loadModels();
    this.reset();
    this.tittleForm = tittles.create;
    this.openDialog(true, false);
  }

  public openEdit() {
    this.loadModels();
    this.tittleForm = tittles.edit;
    if (this.expenseResponse && this.expenseResponse.id) {
      this.incomesService
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

    let data: Income = {
      isIncome: this.isIncomeTransaction,
      ...this.formPSGroups.value,
    };
    const serviceObservable =
      action === 'create'
        ? this.incomesService.create(data)
        : this.incomesService.update(expenseId!, data);

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
          return of('error', this.displayMessage('error', err[0]));
        })
      )
      .subscribe();
  }

  private reset(): void {
    this.formPSGroups = FormUtils.getDefaultExpenseFormGroup();
    this.expense = new Income();
  }

  private displayMessage(type: string, error: string) {
    this.helpersService.messageNotification(type, error);
  }

  private waitForPSGroupSelection() {
    this.incomesService
      .getSelectedData()
      .subscribe((response: Income) => {
        this.expenseResponse = response;
      });
  }

  private registerTableComponentListener() {
    this.incomesService
      .triggerTable
      .subscribe((tableComponent: TableComponent) => {
        this.tableComponent = tableComponent;
      });
  }

  private updateFormValues(psGroup: Income) {
    this.formPSGroups.patchValue(psGroup);
  }

    private loadModels() {
      this.documentTypesService.search().subscribe((documentTypes: DocumentType[]) => {
        this.documentTypes = documentTypes;
      }
    );
  }

}
