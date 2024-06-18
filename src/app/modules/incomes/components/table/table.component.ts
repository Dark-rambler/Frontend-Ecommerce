import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { common } from 'src/app/core/constants/common';
import { buttons, labels, tittles } from 'src/app/core/constants/labels';
import { messages } from 'src/app/core/constants/messages';
import { ColumnFilterType } from 'src/app/core/enums/column-filter-types.enum';
import { TableColumn } from 'src/app/core/interface/table-column.interface';
import { Income } from 'src/app/core/model/income';
import { Pageable } from 'src/app/core/model/pageable';
import { IncomesService } from '../../services/incomes.service';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { FilterService } from 'primeng/api';
import { toYMDdateFormat } from 'src/app/core/utils/date-formats';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { fromTableLazyLoadFiltersToObject } from 'src/app/core/utils/filter';
import { TableColumnDefinitions } from 'src/app/core/utils/table-column-definitions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChild('filter') filter!: ElementRef;
  @Input() data: Income[] = [];

  public messages = messages;
  public labels = labels;
  public tittles = tittles;
  public buttons = buttons;
  public common = common;
  public expenses!: Income[];
  public expense: Income;
  public columns: TableColumn[] = [];
  public columnsToShow: string[] = ['name', 'amount', 'description','documentTypeName', 'date'];
  public columnsStatus: TableColumn[] = [];
  public firstPage = 0;
  // public pageable: any
  public pageable: Pageable
  public totalRecords: number;
  public globalFilter: string;
  public columnFilterType = ColumnFilterType
  private searchSubject = new Subject<string>();

  constructor(
    private incomesService: IncomesService,
    private helpersService: HelpersService,
    public filterService: FilterService
  ) { }

  ngOnInit() {
    this.incomesService.triggerTable.emit(this);
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
    this.expense = new Income();
    this.pageable = new Pageable();
    this.firstPage = 0;
  }

  public onRowSelect(event: any) {
    this.sendSelectedProgrammaticStructure(event.data);
  }

  public onRowUnselect(event: any) {
    this.sendSelectedProgrammaticStructure(new Income());
  }

  public sendSelectedProgrammaticStructure(ProgrammaticStructure: Income) {
    this.incomesService.setSelectedData(ProgrammaticStructure);
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
    this.incomesService.setFilteredData(new Income());
  }

  public filterColumns(event: any) {
    this.updateColumnsDisplay(event);
  }

  private initializeColumnInformation() {
    this.columns = TableColumnDefinitions.getDefaultIncomeColumns()
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
