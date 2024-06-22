import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/app/core/enviroments/enviroment.development';
import { Income } from 'src/app/core/model/income';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class IncomesService extends HttpService<Income>{


  @Output() trigger: EventEmitter<any> = new EventEmitter();
  @Output() triggerInfo: EventEmitter<any> = new EventEmitter();
  @Output() triggerDelete: EventEmitter<any> = new EventEmitter();
  @Output() triggerTable: EventEmitter<any> = new EventEmitter();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.systemUrl}/transaction`);
  }

  public search(isIncome:boolean):Observable<Income[]>{
    return this.http.get<Income[]>(`${this.url}/search?isIncome=${isIncome}`)
    .pipe(catchError(this.handleError));
  }

}
