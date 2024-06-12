import { TableLazyLoadEvent } from 'primeng/table';

export class Pageable {
  page: number | string = '';
  size: number | string = '';
  sortBy: string | string[] = '';
  sortOrder: string = '';

  public setPageableValues(event: TableLazyLoadEvent): void {
    const { first, rows, sortOrder, sortField } = event;
    this.page = first / rows;
    this.size = rows;
    this.sortOrder = sortOrder === 1 ? 'asc' : 'desc';
    this.sortBy = sortField;
    if (!sortField) {
      this.setDefaultSortValues();
    }
  }

  public setDefaultSortValues(): void {
    this.sortBy = 'updatedAt';
    this.sortOrder = 'desc';
  }
}
