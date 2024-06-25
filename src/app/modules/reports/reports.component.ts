import { Component } from '@angular/core';
import { ReportsService } from './services/reports.service';
import { headers } from 'src/app/core/constants/labels';
import { Subscription } from 'rxjs';
import { defaultDate, toYMDdateFormat } from 'src/app/core/utils/date-formats';
import { ReportsModule } from './reports.module';
import { Report } from 'src/app/core/model/report';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: true,
  imports: [ReportsModule],
})
export default class ReportsComponent {
  public headers = headers;
  public data: Report
  public totalAmount: number = 0;
  public totalData: any = [];
  public columns: string[] = ['socialReason', 'documentNumber', 'amount','movementType', 'date'];
  public subcxriptions = new Subscription();
  public startDate: any = "2024-03-01T10:00"
  public endDate: any = "2024-06-30T10:00"
  public chartData: any ;
  private isIncomeTransaction:boolean =true;

  constructor(
    public reportsService: ReportsService
  ) {}

  ngOnInit(): void {
    this.createGrid();
    this.retrieveReloadData();
    this.createChart();
  }

  ngOnDestroy(): void {
    this.subcxriptions.unsubscribe();
  }
  private createGrid(): void {
  this.reportsService.getSummary( this.startDate, this.endDate).subscribe((data) => {
    this.data = data;
    this.formatData()

  });}
  private formatData(){
    this.totalData = [...this.data.incomes, ...this.data.expenses];
    this.totalData = this.totalData.map((item: any) => {
       item.isIncome ? item.income = item.amount : item.expense = item.amount;
      return item;
    });

  }

  private createChart(): void {
    this.reportsService.transactionMonthlySummary(this.startDate, this.endDate).subscribe((data:any) => {
      data.datasets[0].label ="Ingresos"
      data.datasets[1].label ="Egresos"

      this.chartData = data;

    });
  }

  private retrieveReloadData() {
    this.subcxriptions.add( this.reportsService.getFilteredData().subscribe((data:any) => {
      this.startDate =this.convertDate(data.dateRange[0])
      this.endDate = this.convertDate(data.dateRange[1])

      this.createGrid();
      this.createChart();
    })
    );
  }
  convertDate(originalDateStr:Date) {
      // Parsear la fecha original
      const originalDate = new Date(originalDateStr);

      // Formatear la nueva fecha al formato deseado
      const year = originalDate.getUTCFullYear();
      const month = String(originalDate.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexed
      const day = String(originalDate.getUTCDate()).padStart(2, '0');
      const hours = String(originalDate.getUTCHours()).padStart(2, '0');
      const minutes = String(originalDate.getUTCMinutes()).padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}`;
}

}
