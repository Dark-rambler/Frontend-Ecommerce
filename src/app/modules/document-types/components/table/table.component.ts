import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { common } from 'src/app/core/constants/common';
import { buttons, labels, tittles } from 'src/app/core/constants/labels';
import { messages } from 'src/app/core/constants/messages';
import { ColumnFilterType } from 'src/app/core/enums/column-filter-types.enum';
import { TableColumn } from 'src/app/core/interface/table-column.interface';
import { DocumentType } from 'src/app/core/model/document-type';
import { Pageable } from 'src/app/core/model/pageable';
import { DocumentTypesService } from '../../services/document-types.service';
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
  @Input() data: DocumentType[] = [];

  public messages = messages;
  public labels = labels;
  public tittles = tittles;
  public buttons = buttons;
  public common = common;
  public expenses!: DocumentType[];
  public expense: DocumentType;
  public columns: TableColumn[] = [];
  public columnsToShow: string[] = ['name', 'description'];
  public columnsStatus: TableColumn[] = [];
  public firstPage = 0;
  // public pageable: any
  public pageable: Pageable
  public totalRecords: number;
  public globalFilter: string;
  public columnFilterType = ColumnFilterType
  private searchSubject = new Subject<string>();

  constructor(
    private documentTypesService: DocumentTypesService,
    private helpersService: HelpersService,
    public filterService: FilterService
  ) { }

  ngOnInit() {
    this.documentTypesService.triggerTable.emit(this);
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
  }


  private initializeDefaultVariables() {
    this.expense = new DocumentType();
    this.pageable = new Pageable();
    this.firstPage = 0;
  }

  public onRowSelect(event: any) {
    this.sendSelectedProgrammaticStructure(event.data);
  }

  public onRowUnselect(event: any) {
    this.sendSelectedProgrammaticStructure(new DocumentType());
  }

  public sendSelectedProgrammaticStructure(documentType: DocumentType) {
    this.documentTypesService.setSelectedData(documentType);
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
    this.documentTypesService.setFilteredData(new DocumentType());
  }

  public filterColumns(event: any) {
    this.updateColumnsDisplay(event);
  }

  private initializeColumnInformation() {
    this.columns = TableColumnDefinitions.getDefaultExpenseColumns()
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
