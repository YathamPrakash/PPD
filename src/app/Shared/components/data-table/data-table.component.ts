import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  ActionMenuComponent,
  ActionMenuItem
} from '../action-menu/action-menu.component';

import { StatusBadgeComponent } from '../status-badge/status-badge.component';

export interface DataTableColumn {
  key: string;
  label: string;

  /**
   * Optional column width.
   */
  width?: string;

  /**
   * Column alignment.
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Hide column on tablet.
   */
  hideOnTablet?: boolean;

  /**
   * Hide column on mobile.
   */
  hideOnMobile?: boolean;

  /**
   * Display type.
   */
  type?:
  | 'text'
  | 'status'
  | 'date'
  | 'currency'
  | 'tenant';
}

export interface DataTableRow {
  [key: string]: any;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    StatusBadgeComponent,
    ActionMenuComponent
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {

  // ============================================================
  // INPUTS
  // ============================================================

  @Input() columns: DataTableColumn[] = [];

  @Input() rows: DataTableRow[] = [];

  @Input() actions: ActionMenuItem[] = [];

  @Input() showActions = false;

  @Input() loading = false;

  @Input() empty = false;

  @Input() emptyMessage = 'No data available';

  @Input() rowKey = 'id';


  // ============================================================
  // OUTPUTS
  // ============================================================

  @Output() rowClick =
    new EventEmitter<DataTableRow>();

  @Output() actionClick =
    new EventEmitter<{
      action: ActionMenuItem;
      row: DataTableRow;
    }>();


  // ============================================================
  // TABLE COLUMNS
  // ============================================================

  get tableColumns(): DataTableColumn[] {

    if (!this.showActions) {
      return this.columns;
    }

    return [
      ...this.columns,
      {
        key: '__actions',
        label: 'Action',
        width: '80px',
        align: 'right'
      }
    ];
  }


  // ============================================================
  // CELL VALUE
  // ============================================================

  getCellValue(
    row: DataTableRow,
    column: DataTableColumn
  ): any {

    return row?.[column.key];
  }


  // ============================================================
  // TENANT NAME
  //
  // Supports BOTH:
  //
  // 1. tenant: {
  //      name: 'Rahul Sharma',
  //      mobile: '9876543210'
  //    }
  //
  // 2. tenantName: 'Rahul Sharma'
  //    mobile: '9876543210'
  //
  // This keeps existing pages working.
  // ============================================================

  getTenantName(row: DataTableRow, column: DataTableColumn): string {
    const tenant = row[column.key];

    if (tenant && typeof tenant === 'object') {
      return tenant.name ?? '';
    }

    return row['tenantName'] ?? '';
  }


  // ============================================================
  // TENANT MOBILE
  // ============================================================

  getTenantMobile(row: DataTableRow, column: DataTableColumn): string {
    const tenant = row[column.key];

    if (tenant && typeof tenant === 'object') {
      return tenant.mobile ?? '';
    }

    return row['mobile'] ?? '';
  }


  // ============================================================
  // TENANT INITIALS
  // ============================================================

  getTenantInitials(row: DataTableRow, column: DataTableColumn): string {
    const name = this.getTenantName(row, column);

    if (!name) {
      return 'U';
    }

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part: string) => part.charAt(0).toUpperCase())
      .join('');
  }


  // ============================================================
  // ROW CLICK
  // ============================================================

  onRowClick(row: DataTableRow): void {

    this.rowClick.emit(row);
  }


  // ============================================================
  // ACTION CLICK
  // ============================================================

  onActionClick(
    action: ActionMenuItem,
    row: DataTableRow
  ): void {

    this.actionClick.emit({
      action,
      row
    });
  }


  // ============================================================
  // TRACK BY ROW
  // ============================================================

  trackByRow = (
    index: number,
    row: DataTableRow
  ): string | number => {

    return row?.[this.rowKey] ?? index;
  };


  // ============================================================
  // TRACK BY COLUMN
  // ============================================================

  trackByColumn = (
    index: number,
    column: DataTableColumn
  ): string => {

    return column.key;
  };
}