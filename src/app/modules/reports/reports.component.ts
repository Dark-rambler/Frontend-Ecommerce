import { Component } from '@angular/core';
import { ReportsService } from './services/reports.service';
import { headers } from 'src/app/core/constants/labels';
import { Subscription } from 'rxjs';
import { defaultDate, toYMDdateFormat } from 'src/app/core/utils/date-formats';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: true
})
export default class ReportsComponent {
  public headers = headers;
  public data: Report ;
  public totalAmount: number = 0;
  public columns: string[] = ['socialReason', 'documentNumber','description', 'amount','documentType', 'date'];
  public subcxriptions = new Subscription();
  private isIncomeTransaction:boolean =true;

  constructor(
    public reportsService: ReportsService
  ) {}

  ngOnInit(): void {
    this.createGrid();
    this.retrieveReloadData();
  }

  ngOnDestroy(): void {
    this.subcxriptions.unsubscribe();
  }
  private createGrid(): void {
  this.reportsService.getSummary( new Date(toYMDdateFormat(defaultDate())), new Date(toYMDdateFormat(defaultDate()))).subscribe((data) => {
    console.log(data);

  });}

  private retrieveReloadData() {
    this.subcxriptions.add( this.reportsService.getFilteredData().subscribe((data) => {
      this.createGrid();
    })
    );
  }

}
