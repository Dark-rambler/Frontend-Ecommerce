import { TableColumnType } from "../enums/table-column-type.enum";
import { DropdownOption } from "./dropdown.option.interface";

export interface TableColumn {
  field: string;
  header: string;
  data?: boolean;
  style?: string;
  expand?: boolean;
  infoExpand?: boolean;
  type?: string;
  colSpan?: number;
  isDate?: boolean;
  format?: string;
  state?: boolean;
  width?: number;
  code?: string;
  iconExpand?: boolean;
  enumType?: any;
  columnType?: TableColumnType;
  enumFilterDropdownOptions?: DropdownOption[];
  filterName?: string;
  isFilterInactive?: boolean;
  currency?: string;
  unit?: string;
}
