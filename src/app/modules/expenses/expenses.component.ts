import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesModule } from './expenses.module';
import { headers } from 'src/app/core/constants/labels';
import { ExpensesService } from './services/expenses.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { ModalInformationComponent } from 'src/app/shared/components/modal-information/modal-information.component';
import { ModalDeleteComponent } from 'src/app/shared/components/modal-delete/modal-delete.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, ExpensesModule, ModalInformationComponent,ModalDeleteComponent ],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers: [CommonModule, HelpersService]
})
export default class ExpensesComponent {
  public headers = headers;
  public data: any;
  public totalAmount: number = 0;
  public columns: string[] = ['socialReason', 'documentNumber','description', 'amount','documentType', 'date'];
  public subcxriptions = new Subscription();
  private isIncomeTransaction:boolean =false;

  constructor(
    public expensesService: ExpensesService
  ) {}

  ngOnInit(): void {
    this.createGrid();
    this.retrieveReloadData();
  }

  ngOnDestroy(): void {
    this.subcxriptions.unsubscribe();
  }
  private createGrid(): void {
  this.expensesService.search(this.isIncomeTransaction).subscribe((data) => {
    this.data = data;
    this.getTotalAmount();
  });}

  private retrieveReloadData() {
    this.subcxriptions.add( this.expensesService.getFilteredData().subscribe((data) => {
      this.createGrid();
    })
    );
  }
  private getTotalAmount() {
    this.totalAmount = this.data.reduce((acc: number, expense: any) => {
      return acc + expense.amount;
    }, 0);

  }

}
