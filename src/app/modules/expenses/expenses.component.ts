import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesModule } from './expenses.module';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, ExpensesModule],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export default class ExpensesComponent {

}
