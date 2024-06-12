import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesModule } from './expenses.module';
import { headers } from 'src/app/core/constants/labels';
import { ExpensesService } from './services/expenses.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, ExpensesModule],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers: [HelpersService, ]
})
export default class ExpensesComponent {
  public headers = headers;
  public data: any;


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
