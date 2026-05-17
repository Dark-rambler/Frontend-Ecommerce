import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { headers } from 'src/app/core/constants/labels';
import { Subscription } from 'rxjs';
import { IncomesService } from './services/incomes.service';
import { IncomesModule } from './incomes.module';
import { ModalDeleteComponent } from 'src/app/shared/components/modal-delete/modal-delete.component';
import { ModalInformationComponent } from 'src/app/shared/components/modal-information/modal-information.component';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { Income } from 'src/app/core/model/income';

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [CommonModule, IncomesModule, ModalDeleteComponent, ModalInformationComponent],
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  providers: [HelpersService]
})
export default class IncomesComponent {
  public headers = headers;
  public data: Income [];
  public totalAmount: number = 0;
  public columns: string[] = ['socialReason', 'documentNumber','description', 'amount','documentType', 'date'];
  public subcxriptions = new Subscription();
  private isIncomeTransaction:boolean =true;

  constructor(
    public incomesService: IncomesService
  ) {}

  ngOnInit(): void {
    this.createGrid();
    this.retrieveReloadData();
  }

  ngOnDestroy(): void {
    this.subcxriptions.unsubscribe();
  }
  private createGrid(): void {
  this.incomesService.search(this.isIncomeTransaction).subscribe((data) => {
    this.data = data;
    this.getTotalAmount();
  });}

  private retrieveReloadData() {
    this.subcxriptions.add( this.incomesService.getFilteredData().subscribe((data) => {
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
