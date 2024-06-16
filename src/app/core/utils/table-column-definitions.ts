import { labels } from "../constants/labels";
import { ColumnFilterType } from "../enums/column-filter-types.enum";
import { TableColumnType } from "../enums/table-column-type.enum";
import { TableColumn } from "../interface/table-column.interface";

export class TableColumnDefinitions{
  static getDefaultExpenseColumns():TableColumn[]{
      return [
        {
          field: 'name',
          header: labels.name,
          type: ColumnFilterType.TEXT,
          columnType: TableColumnType.TEXT,
        },
        {
          field: 'description',
          header: labels.description,
          type: ColumnFilterType.TEXT,
          columnType: TableColumnType.TEXT,
        },
        {
          field: 'amount',
          header: labels.amount,
          type: ColumnFilterType.NUMERIC,
          columnType: TableColumnType.NUMERIC,
        },
        {
          field: 'date',
          header: labels.date,
          type: ColumnFilterType.DATE,
          columnType: TableColumnType.DATE,
        },
        {
          field: 'documentTypeName',
          header: labels.category,
          type: ColumnFilterType.TEXT,
          columnType: TableColumnType.TEXT,
        }
      ]
  }

  static getDefaultDocumentTypeColumns():TableColumn[]{
    return [
      {
        field: 'name',
        header: labels.name,
        type: ColumnFilterType.TEXT,
        columnType: TableColumnType.TEXT,
      },
      {
        field: 'description',
        header: labels.description,
        type: ColumnFilterType.TEXT,
        columnType: TableColumnType.TEXT,
      }
    ]

  }
}
