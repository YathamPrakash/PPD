import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  ActionMenuItem
} from '../../Shared/components/action-menu/action-menu.component';

import {
  DataTableColumn,
  DataTableRow
} from '../../Shared/components/data-table/data-table.component';

import {
  MobileDataField
} from '../../Shared/components/mobile-data-card/mobile-data-card.component';

import {
  SearchFilterItem
} from '../../Shared/components/search-filter/search-filter.component';

import { PageHeaderComponent } from '../../Shared/components/page-header/page-header.component';
import { SearchFilterComponent } from '../../Shared/components/search-filter/search-filter.component';
import { DataTableComponent } from '../../Shared/components/data-table/data-table.component';
import { MobileDataCardComponent } from '../../Shared/components/mobile-data-card/mobile-data-card.component';
import { PaginationComponent } from '../../Shared/components/pagination/pagination.component';
import { LoadingSkeletonComponent } from '../../Shared/components/loading-skeleton/loading-skeleton.component';
import { EmptyStateComponent } from '../../Shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../Shared/components/error-state/error-state.component';

export interface TenantHistory {
  id: number;
  tenantName: string;
  mobile: string;
  room: string;
  bed: string;
  action: string;
  previousValue: string;
  newValue: string;
  date: string;
  status: string;
  avatar: string;
}

@Component({
  selector: 'app-tenant-history',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    SearchFilterComponent,
    DataTableComponent,
    MobileDataCardComponent,
    PaginationComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent
  ],
  templateUrl: './tenant-history.component.html',
  styleUrl: './tenant-history.component.scss'
})
export class TenantHistoryComponent implements OnInit {

  // ======================================================
  // STATE
  // ======================================================

  loading = false;
  error = false;

  // ======================================================
  // PAGINATION
  // ======================================================

  currentPage = 1;
  pageSize = 8;

  // ======================================================
  // SEARCH / FILTER
  // ======================================================

  searchValue = '';

  filters: SearchFilterItem[] = [
    {
      key: 'action',
      label: 'Action',
      type: 'select',
      options: [
        { label: 'All Actions', value: '' },
        { label: 'Added', value: 'Added' },
        { label: 'Room Changed', value: 'Room Changed' },
        { label: 'Bed Changed', value: 'Bed Changed' },
        { label: 'Rent Updated', value: 'Rent Updated' },
        { label: 'Status Changed', value: 'Status Changed' },
        { label: 'Payment Updated', value: 'Payment Updated' },
        { label: 'Details Updated', value: 'Details Updated' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'All Statuses', value: '' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Pending', value: 'Pending' }
      ]
    },
    {
      key: 'date',
      label: 'Date',
      type: 'date'
    }
  ];

  filterValues: {
    [key: string]: string;
  } = {};

  // ======================================================
  // ACTIONS
  // ======================================================

  actions: ActionMenuItem[] = [
    {
      label: 'View Tenant',
      value: 'view',
      icon: 'fa-solid fa-eye'
    },
    {
      label: 'View Details',
      value: 'details',
      icon: 'fa-solid fa-clock-rotate-left'
    }
  ];

  // ======================================================
  // TABLE COLUMNS
  // ======================================================

  columns: DataTableColumn[] = [
    {
      key: 'tenant',
      label: 'Tenant',
      width: '22%',
      align: 'left',
      type: 'tenant'
    },
    {
      key: 'room',
      label: 'Room',
      width: '10%',
      align: 'left'
    },
    {
      key: 'action',
      label: 'Action',
      width: '16%',
      align: 'left'
    },
    {
      key: 'previousValue',
      label: 'Previous',
      width: '16%',
      align: 'left',
      hideOnTablet: true
    },
    {
      key: 'newValue',
      label: 'New Value',
      width: '16%',
      align: 'left',
      hideOnTablet: true
    },
    {
      key: 'date',
      label: 'Date',
      width: '12%',
      align: 'left',
      type: 'date'
    },
    {
      key: 'status',
      label: 'Status',
      width: '10%',
      align: 'left',
      type: 'status'
    }
  ];

  // ======================================================
  // MOBILE FIELDS
  // ======================================================

  mobileFields: MobileDataField[] = [
    {
      key: 'action',
      label: 'Action',
      primary: true
    },
    {
      key: 'room',
      label: 'Room'
    },
    {
      key: 'previousValue',
      label: 'Previous',
      hideIfEmpty: true
    },
    {
      key: 'newValue',
      label: 'New Value',
      hideIfEmpty: true
    },
    {
      key: 'date',
      label: 'Date',
      type: 'date'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'status'
    }
  ];

  // ======================================================
  // DATA
  // ======================================================

  tenantHistory: TenantHistory[] = [
    {
      id: 1,
      tenantName: 'Rahul Sharma',
      mobile: '9876543210',
      room: 'Room 101',
      bed: 'Bed A',
      action: 'Added',
      previousValue: '-',
      newValue: 'Tenant Added',
      date: '2026-09-10',
      status: 'Completed',
      avatar: 'RS'
    },
    {
      id: 2,
      tenantName: 'Priya Reddy',
      mobile: '9876501234',
      room: 'Room 204',
      bed: 'Bed B',
      action: 'Room Changed',
      previousValue: 'Room 201',
      newValue: 'Room 204',
      date: '2026-09-08',
      status: 'Completed',
      avatar: 'PR'
    },
    {
      id: 3,
      tenantName: 'Arjun Kumar',
      mobile: '9988776655',
      room: 'Room 103',
      bed: 'Bed C',
      action: 'Bed Changed',
      previousValue: 'Bed A',
      newValue: 'Bed C',
      date: '2026-09-06',
      status: 'Completed',
      avatar: 'AK'
    },
    {
      id: 4,
      tenantName: 'Sneha Reddy',
      mobile: '9123456789',
      room: 'Room 302',
      bed: 'Bed A',
      action: 'Rent Updated',
      previousValue: '₹8,000',
      newValue: '₹8,500',
      date: '2026-09-04',
      status: 'Completed',
      avatar: 'SR'
    },
    {
      id: 5,
      tenantName: 'Vikram Singh',
      mobile: '9012345678',
      room: 'Room 105',
      bed: 'Bed B',
      action: 'Status Changed',
      previousValue: 'Pending',
      newValue: 'Active',
      date: '2026-09-02',
      status: 'Completed',
      avatar: 'VS'
    },
    {
      id: 6,
      tenantName: 'Ananya Rao',
      mobile: '9345678901',
      room: 'Room 202',
      bed: 'Bed A',
      action: 'Payment Updated',
      previousValue: 'Pending',
      newValue: 'Paid',
      date: '2026-08-30',
      status: 'Completed',
      avatar: 'AR'
    },
    {
      id: 7,
      tenantName: 'Kiran Reddy',
      mobile: '9456789012',
      room: 'Room 106',
      bed: 'Bed C',
      action: 'Details Updated',
      previousValue: 'Old Contact',
      newValue: 'New Contact',
      date: '2026-08-28',
      status: 'Completed',
      avatar: 'KR'
    },
    {
      id: 8,
      tenantName: 'Meghana Das',
      mobile: '9567890123',
      room: 'Room 301',
      bed: 'Bed B',
      action: 'Room Changed',
      previousValue: 'Room 305',
      newValue: 'Room 301',
      date: '2026-08-26',
      status: 'Completed',
      avatar: 'MD'
    },
    {
      id: 9,
      tenantName: 'Suresh Babu',
      mobile: '9678901234',
      room: 'Room 104',
      bed: 'Bed A',
      action: 'Rent Updated',
      previousValue: '₹7,500',
      newValue: '₹8,000',
      date: '2026-08-24',
      status: 'Completed',
      avatar: 'SB'
    },
    {
      id: 10,
      tenantName: 'Divya Patel',
      mobile: '9789012345',
      room: 'Room 203',
      bed: 'Bed B',
      action: 'Status Changed',
      previousValue: 'Inactive',
      newValue: 'Active',
      date: '2026-08-22',
      status: 'Completed',
      avatar: 'DP'
    },
    {
      id: 11,
      tenantName: 'Naveen Kumar',
      mobile: '9890123456',
      room: 'Room 107',
      bed: 'Bed A',
      action: 'Details Updated',
      previousValue: 'Old Address',
      newValue: 'New Address',
      date: '2026-08-20',
      status: 'Completed',
      avatar: 'NK'
    },
    {
      id: 12,
      tenantName: 'Pooja Singh',
      mobile: '9901234567',
      room: 'Room 205',
      bed: 'Bed C',
      action: 'Payment Updated',
      previousValue: 'Pending',
      newValue: 'Paid',
      date: '2026-08-18',
      status: 'Completed',
      avatar: 'PS'
    }
  ];

  filteredHistory: TenantHistory[] = [];
  paginatedHistory: TenantHistory[] = [];

  // ======================================================
  // INIT
  // ======================================================

  ngOnInit(): void {
    this.applyFilters();
  }

  // ======================================================
  // SEARCH
  // ======================================================

  onSearchChange(value: string): void {
    this.searchValue = value.trim().toLowerCase();
    this.currentPage = 1;

    this.applyFilters();
  }

  // ======================================================
  // FILTER
  // ======================================================

  onFilterChange(event: {
    key: string;
    value: string;
  }): void {
    this.filterValues[event.key] = event.value;
    this.currentPage = 1;

    this.applyFilters();
  }

  // ======================================================
  // RESET
  // ======================================================

  onReset(): void {
    this.searchValue = '';
    this.filterValues = {};
    this.currentPage = 1;

    this.applyFilters();
  }

  // ======================================================
  // APPLY FILTERS
  // ======================================================

  applyFilters(): void {
    let result = [...this.tenantHistory];

    // Search
    if (this.searchValue) {
      result = result.filter(history =>
        history.tenantName.toLowerCase().includes(this.searchValue) ||
        history.mobile.includes(this.searchValue) ||
        history.room.toLowerCase().includes(this.searchValue) ||
        history.action.toLowerCase().includes(this.searchValue)
      );
    }

    // Action
    const action = this.filterValues['action'];

    if (action) {
      result = result.filter(history =>
        history.action === action
      );
    }

    // Status
    const status = this.filterValues['status'];

    if (status) {
      result = result.filter(history =>
        history.status === status
      );
    }

    // Date
    const date = this.filterValues['date'];

    if (date) {
      result = result.filter(history =>
        history.date === date
      );
    }

    this.filteredHistory = result;

    const totalPages = Math.max(
      1,
      Math.ceil(this.filteredHistory.length / this.pageSize)
    );

    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }

    this.updatePagination();
  }

  // ======================================================
  // PAGINATION
  // ======================================================

  updatePagination(): void {
    const start =
      (this.currentPage - 1) * this.pageSize;

    const end =
      start + this.pageSize;

    this.paginatedHistory =
      this.filteredHistory.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  // ======================================================
  // ROW CLICK
  // ======================================================

  onRowClick(row: DataTableRow): void {
    console.log('History row clicked:', row);
  }

  // ======================================================
  // TABLE ACTION
  // ======================================================

  onTableAction(event: {
    action: ActionMenuItem;
    row: DataTableRow;
  }): void {
    switch (event.action.value) {
      case 'view':
        this.viewTenant(event.row);
        break;

      case 'details':
        this.viewHistoryDetails(event.row);
        break;
    }
  }

  // ======================================================
  // MOBILE ACTION
  // ======================================================

  onMobileAction(event: {
    action: ActionMenuItem;
    row: DataTableRow;
  }): void {
    this.onTableAction(event);
  }

  // ======================================================
  // MOBILE VIEW
  // ======================================================

  onMobileView(row: DataTableRow): void {
    this.viewHistoryDetails(row);
  }

  // ======================================================
  // ACTION HANDLERS
  // ======================================================

  viewTenant(row: DataTableRow): void {
    console.log('View tenant:', row);
  }

  viewHistoryDetails(row: DataTableRow): void {
    console.log('View history details:', row);
  }

  // ======================================================
  // TRACK BY
  // ======================================================

  trackHistory(
    index: number,
    history: TenantHistory
  ): number {
    return history.id;
  }
}