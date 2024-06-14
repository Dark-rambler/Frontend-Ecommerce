import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesModule } from './expenses.module';
import { headers } from 'src/app/core/constants/labels';
import { ExpensesService } from './services/expenses.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { ModalInformationComponent } from 'src/app/shared/components/modal-information/modal-information.component';
import { ModalDeleteComponent } from 'src/app/shared/components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, ExpensesModule, ModalInformationComponent, ],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers: [CommonModule, HelpersService]
})
export default class ExpensesComponent {
  public headers = headers;
  public data: any;
  public columns: string[] = ['name', 'description', 'amount', 'date'];


  constructor(
    public expensesService: ExpensesService

  ) {}

  ngOnInit(): void {
    this.createGrid();
  }
  private createGrid(): void {
  this.expensesService.findAll().subscribe((data) => {
    this.data = data;
  });}



}
