import { labels } from "../constants/labels";
import { ColumnFilterType } from "../enums/column-filter-types.enum";
import { TableColumnType } from "../enums/table-column-type.enum";
import { environment } from "../enviroments/enviroment.development";
import { TableColumn } from "../interface/table-column.interface";
import { formatDateTable } from "./date-formats";

export class TableColumnDefinitions {
  static getDefaultExpenseColumns(): TableColumn[] {
    return [
      {
        field: 'socialReason',
        header: labels.socialReason,
        type: ColumnFilterType.TEXT,
        columnType: TableColumnType.TEXT,
      },
      {
        field: 'documentNumber',
        header: labels.documentNumber,
        type: ColumnFilterType.NUMERIC,
        columnType: TableColumnType.NUMERIC,
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
        format: formatDateTable(environment.formatDate),
      },
      {
        field: 'documentType',
        header: labels.documentType,
        type: ColumnFilterType.TEXT,
        columnType: TableColumnType.TEXT,
      }
    ]
  }

  static getDefaultDocumentTypeColumns(): TableColumn[] {
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

  static getDefaultIncomeColumns(): TableColumn[] {
    return [
      {
        field: 'socialReason',
        header: labels.socialReason,
        type: ColumnFilterType.TEXT,
        columnType: TableColumnType.TEXT,
      },
      {
        field: 'documentNumber',
        header: labels.documentNumber,
        type: ColumnFilterType.NUMERIC,
        columnType: TableColumnType.NUMERIC,
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
        format: 'dd/MM/yyyy'
      },
      {
        field: 'documentType',
        header: labels.documentType,
        type: ColumnFilterType.TEXT,
        columnType: TableColumnType.TEXT,
      }
    ]
  }
  static getDefaultReportColumns(): TableColumn[] {
    return [
      {
        field: 'socialReason',
        header: labels.socialReason,
        type: ColumnFilterType.TEXT,
        columnType: TableColumnType.TEXT,
      },
      {
        field: 'documentNumber',
        header: labels.documentNumber,
        type: ColumnFilterType.NUMERIC,
        columnType: TableColumnType.NUMERIC,
      },
      {
        field: 'income',
        header: labels.income,
        type: ColumnFilterType.NUMERIC,
        columnType: TableColumnType.NUMERIC,
      },
      {
        field: 'expense',
        header: labels.expense,
        type: ColumnFilterType.NUMERIC,
        columnType: TableColumnType.NUMERIC,
      },
      {
        field: 'date',
        header: labels.date,
        type: ColumnFilterType.DATE,
        columnType: TableColumnType.DATE,
        format: 'dd/MM/yyyy'
      }
    ]
  }
}
