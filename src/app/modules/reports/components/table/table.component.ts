import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { common } from 'src/app/core/constants/common';
import { buttons, labels, tittles } from 'src/app/core/constants/labels';
import { messages } from 'src/app/core/constants/messages';
import { ColumnFilterType } from 'src/app/core/enums/column-filter-types.enum';
import { TableColumn } from 'src/app/core/interface/table-column.interface';
import { Expense } from 'src/app/core/model/expense';
import { Pageable } from 'src/app/core/model/pageable';
import { ReportsService } from '../../services/reports.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { FilterService } from 'primeng/api';
import { toYMDdateFormat } from 'src/app/core/utils/date-formats';
import { fromTableLazyLoadFiltersToObject } from 'src/app/core/utils/filter';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { Report } from 'src/app/core/model/report';
import { TableColumnDefinitions } from 'src/app/core/utils/table-column-definitions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [HelpersService]
})
export class TableComponent {
  @ViewChild('filter') filter!: ElementRef;
  @Input() report: Report
  @Input() totalData: any[]

  public data: any = [];
  public messages = messages;
  public labels = labels;
  public tittles = tittles;
  public buttons = buttons;
  public common = common;
  public expenses!: Expense[];
  public expense: Expense;
  public columns: TableColumn[] = [];
  public columnsToShow: string[] = ['socialReason', 'documentNumber', 'income','expense', 'date'];
  public columnsStatus: TableColumn[] = [];
  public firstPage = 0;
  budgetItemTypes: any = ['ingresos', 'egresos'];
  // public pageable: any
  public pageable: Pageable
  public totalRecords: number;
  public globalFilter: string;
  public columnFilterType = ColumnFilterType
  private searchSubject = new Subject<string>();

  constructor(
    private expensesService: ReportsService,
    private helpersService: HelpersService,
    public filterService: FilterService
  ) { }

  ngOnInit() {
    this.expensesService.triggerTable.emit(this);
    this.initializeColumnInformation();
    this.initializeDefaultVariables();
    this.initializeDebounceSearch();
  }

  ngAfterViewInit() {
    this.helpersService.translateChange('es');

  }

  public formateDate(date: string) {
    return toYMDdateFormat(date);
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  public loadProgrammaticStructures(event: TableLazyLoadEvent) {
    const filters = fromTableLazyLoadFiltersToObject(event.filters)
    this.pageable.setPageableValues(event);
    // this.createGrid(filters);
  }
  public onDateRangeSelected(event: any) {
    this.pageable.setPageableValues(event);
    this.loadProgrammaticStructures
  }

  public filterByDateAndBudget()
  {
    this.pageable = new Pageable();
    this.pageable.page = 0;
    this.pageable.size = 10;
    this.loadProgrammaticStructures
  }

  public getAmount(value :any) {
    console.log(value);

  }
  // private createGrid(filters?: any) {
  //   this.expensesService.findAll()
  //     .subscribe((response: any) => {
  //       this.expenses = response.content;
  //       this.totalRecords = response.totalElements;
  //     });
  //   // this.expensesService.pageable(this.pageable, filters, this.globalFilter)
  //   //   .subscribe((response: any) => {
  //   //     this.budgetAuthorizations = response.content;
  //   //     this.totalRecords = response.totalElements;
  //   //   });
  // }

  private initializeDefaultVariables() {
    this.expense = new Expense();
    this.pageable = new Pageable();
    this.firstPage = 0;
  }

  public onGlobalFilter( table: any,event: any) {
    this.globalFilter = event.target.value;
    table.filterGlobal(this.globalFilter, 'contains');
    // this.createGrid();
  }

  public onRowSelect(event: any) {
    this.sendSelectedProgrammaticStructure(event.data);
  }

  public onRowUnselect(event: any) {
    this.sendSelectedProgrammaticStructure(new Report());
  }

  public sendSelectedProgrammaticStructure(ProgrammaticStructure: Report) {
    this.expensesService.setSelectedData(ProgrammaticStructure);
  }

  public onSearch() {
    this.searchSubject.next(this.globalFilter);
  }

  public clear( table: Table) {
    this.filter.nativeElement.value = '';
    this.globalFilter = '';
    table.clear();
  }

  public reload() {
    this.expensesService.setFilteredData(new Report());
  }

  public filterColumns(event: any) {
    this.updateColumnsDisplay(event);
  }

  private initializeColumnInformation() {
    this.columns = TableColumnDefinitions.getDefaultReportColumns()
    this.columnsStatus = this.initializeColumnsStatus();
  }

  private initializeColumnsStatus(): TableColumn[] {
    return this.columns.filter((column) =>
      this.columnsToShow.includes(column.field)
    );
  }

  private updateColumnsDisplay(event: TableColumn[]) {
    this.columnsStatus = event;
    this.columnsToShow = event.map(column => column.field);
  }

  private initializeDebounceSearch() {
    this.searchSubject.pipe(debounceTime(common.inputDebounceDelay)).subscribe((searchValue) => {
      this.globalFilter = searchValue;
      // this.createGrid();

    });
  }
}
