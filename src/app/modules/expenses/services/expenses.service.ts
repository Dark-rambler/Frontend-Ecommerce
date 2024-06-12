import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/app/core/enviroments/enviroment.development';
import { Expense } from 'src/app/core/model/expense';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService extends HttpService<Expense >{

  @Output() trigger: EventEmitter<any> = new EventEmitter();
  @Output() triggerInfo: EventEmitter<any> = new EventEmitter();
  @Output() triggerDelete: EventEmitter<any> = new EventEmitter();
  @Output() triggerTable: EventEmitter<any> = new EventEmitter();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.systemUrl}/expenses`);
  }


}
