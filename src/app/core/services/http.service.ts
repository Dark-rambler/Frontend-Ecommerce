import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService<T> {
  private filteredData: Subject<T> = new Subject<T>();
  private selectedData: Subject<T> = new Subject<T>();

  constructor(
    protected http: HttpClient,
    @Inject('url') protected url: string
  ) { }

  public findAll() {
    return this.http.get<T[]>(this.url).pipe(catchError(this.handleError));
  }

  public findById(id: number) {
    return this.http
      .get<T>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  public create(t: T) {
    return this.http.post(this.url, t).pipe(catchError(this.handleError));
  }

  public update(id: number, t: T) {
    return this.http
      .put(`${this.url}/${id}`, t)
      .pipe(catchError(this.handleError));
  }

  public delete(id: number) {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  public getFilteredData() {
    return this.filteredData.asObservable();
  }

  public setFilteredData(data: T) {
    this.filteredData.next(data);
  }

  public getSelectedData() {
    return this.selectedData.asObservable();
  }

  public setSelectedData(data: T) {
    this.selectedData.next(data);
  }
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string[] = [];
    if (error.status === 500) {
      if (error.error && error.error.message) {
        errorMessage.push(error.error.message);
      }
    }
    if (error.status === 409) {
      if (error.error && error.error.message) {
        errorMessage.push(error.error.message);
      }
    }
    if (error.status === 400) {
      if (error.error && error.error.message) {
        errorMessage.push(error.error.message);
      }
      else if (error.error && error.error.errors) {
        error.error.errors.forEach((errorMessages: any) => {
          errorMessage.push(errorMessages.message);
        });
      }
      else if (error.error && error.error.errorList) {
        error.error.errorList.forEach((errorMessages: any) => {
          errorMessage.push(errorMessages.message);
        });
      }
    }
    return throwError(errorMessage);
  }
}
