import { Base } from "./base"
import { Expense } from "./expense";
import { Income } from "./income";

export class Report extends Base {
  incomes: Income[] = [];
  expenses: Expense[] = [];
  totalIncome: number = 0.0;
  totalExpense: number = 0.0;
  balance: number = 0.0;
}
