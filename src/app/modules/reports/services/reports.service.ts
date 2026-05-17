import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/app/core/enviroments/enviroment.development';
import { Report } from 'src/app/core/model/report';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends HttpService<Report>{

  @Output() trigger: EventEmitter<any> = new EventEmitter();
  @Output() triggerInfo: EventEmitter<any> = new EventEmitter();
  @Output() triggerDelete: EventEmitter<any> = new EventEmitter();
  @Output() triggerTable: EventEmitter<any> = new EventEmitter();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.systemUrl}/transaction`);
  }

  // public search(isIncome:boolean):Observable<Income[]>{
  //   return this.http.get<Income[]>(`${this.url}/search?isIncome=${isIncome}`)
  //   .pipe(catchError(this.handleError));
  // }

  public getSummary( startDate:Date, endDate:Date): Observable<Report> {
    return this.http.get<Report>(`${this.url}/transactionSummary?startDate=${startDate}&endDate=${endDate}`)
    .pipe(catchError(this.handleError));
  }

  public transactionMonthlySummary( startDate:Date, endDate:Date): Observable<Report> {
    return this.http.get<Report>(`${this.url}/transactionMonthlySummary?startDate=${startDate}&endDate=${endDate}`)
    .pipe(catchError(this.handleError));
  }

}
