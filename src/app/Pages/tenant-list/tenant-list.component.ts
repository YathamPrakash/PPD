import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../Shared/components/page-header/page-header.component';
import { Router } from '@angular/router';
import {SearchFilterComponent,SearchFilterItem} from '../../Shared/components/search-filter/search-filter.component';
import {DataTableComponent,DataTableColumn,DataTableRow} from '../../Shared/components/data-table/data-table.component';
import {MobileDataCardComponent,MobileDataField} from '../../Shared/components/mobile-data-card/mobile-data-card.component';
import {PaginationComponent} from '../../Shared/components/pagination/pagination.component';
import {ActionMenuItem} from '../../Shared/components/action-menu/action-menu.component';
import {LoadingSkeletonComponent} from '../../Shared/components/loading-skeleton/loading-skeleton.component';
import {EmptyStateComponent} from '../../Shared/components/empty-state/empty-state.component';
import {ErrorStateComponent} from '../../Shared/components/error-state/error-state.component';

export type TenantStatus = 'Active' | 'Inactive' | 'Pending';

interface Tenant extends DataTableRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  room: string;
  bed: string;
  joinDate: string;
  rent: number;
  status: string;
  avatar: string;
}

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    PageHeaderComponent,
    SearchFilterComponent,
    DataTableComponent,
    MobileDataCardComponent,
    PaginationComponent,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent],
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.scss'
})
export class TenantListComponent {



  // =========================================================
  // PAGE STATE
  // =========================================================

  loading = false;

  error = false;

  currentPage = 1;

  pageSize = 10;


  // =========================================================
  // SEARCH / FILTER
  // =========================================================

  searchValue = '';

  filterValues: {
    [key: string]: string;
  } = {};


  filters: SearchFilterItem[] = [

    {
      key: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'All Statuses',

      options: [
        {
          label: 'Active',
          value: 'Active'
        },
        {
          label: 'Inactive',
          value: 'Inactive'
        },
        {
          label: 'Vacating',
          value: 'Vacating'
        }
      ]
    },

    {
      key: 'room',
      label: 'Room',
      type: 'select',
      placeholder: 'All Rooms',

      options: [
        {
          label: 'Room 101',
          value: 'Room 101'
        },
        {
          label: 'Room 102',
          value: 'Room 102'
        },
        {
          label: 'Room 103',
          value: 'Room 103'
        },
        {
          label: 'Room 104',
          value: 'Room 104'
        }
      ]
    }
  ];


  // =========================================================
  // TABLE COLUMNS
  // =========================================================

  columns: DataTableColumn[] = [

    {
      key: 'name',
      label: 'Tenant',
      width: '220px',
      type: 'text'
    },

    {
      key: 'room',
      label: 'Room / Bed',
      width: '140px',
      type: 'text'
    },

    {
      key: 'phone',
      label: 'Mobile',
      width: '150px',
      type: 'text'
    },

    {
      key: 'joinDate',
      label: 'Join Date',
      width: '130px',
      type: 'date'
    },

    {
      key: 'rent',
      label: 'Rent',
      width: '120px',
      align: 'right',
      type: 'currency'
    },

    {
      key: 'status',
      label: 'Status',
      width: '120px',
      align: 'center',
      type: 'status'
    }
  ];


  // =========================================================
  // TABLE ACTIONS
  // =========================================================

  actions: ActionMenuItem[] = [

    {
      label: 'View Details',
      value: 'view',
      icon: 'fa-solid fa-eye'
    },

    {
      label: 'Edit Tenant',
      value: 'edit',
      icon: 'fa-solid fa-pen'
    },

    {
      label: 'Payment History',
      value: 'payments',
      icon: 'fa-solid fa-credit-card'
    },

    {
      label: 'Mark Inactive',
      value: 'inactive',
      icon: 'fa-solid fa-user-slash',
      dividerBefore: true,
      danger: true
    }
  ];


  // =========================================================
  // MOBILE CARD FIELDS
  // =========================================================

  mobileFields: MobileDataField[] = [

    {
      key: 'phone',
      label: 'Mobile',
      type: 'text'
    },

    {
      key: 'room',
      label: 'Room / Bed',
      type: 'text'
    },

    {
      key: 'joinDate',
      label: 'Joined',
      type: 'date'
    },

    {
      key: 'rent',
      label: 'Monthly Rent',
      type: 'currency',
      primary: true
    },

    {
      key: 'status',
      label: 'Status',
      type: 'status'
    }
  ];


  // =========================================================
  // TENANT DATA
  // =========================================================

  tenants: Tenant[] = [

    {
      id: 1,
      name: 'Rahul Kumar',
      email: 'rahul.kumar@gmail.com',
      phone: '+91 98765 43210',
      room: 'Room 101',
      bed: 'Bed A',
      joinDate: '2026-06-05',
      rent: 8500,
      status: 'Active',
      avatar: 'RK',
      type: 'tenant'
    },

    {
      id: 2,
      name: 'Arjun Reddy',
      email: 'arjun.reddy@gmail.com',
      phone: '+91 98765 42109',
      room: 'Room 102',
      bed: 'Bed B',
      joinDate: '2026-05-18',
      rent: 9000,
      status: 'Active',
      avatar: 'AR',
      type: 'tenant'
    },

    {
      id: 3,
      name: 'Kiran Kumar',
      email: 'kiran.kumar@gmail.com',
      phone: '+91 99887 66554',
      room: 'Room 103',
      bed: 'Bed A',
      joinDate: '2026-04-22',
      rent: 8500,
      status: 'Active',
      avatar: 'KK',
      type: 'tenant'
    },

    {
      id: 4,
      name: 'Vishal Sharma',
      email: 'vishal.sharma@gmail.com',
      phone: '+91 91234 56789',
      room: 'Room 104',
      bed: 'Bed C',
      joinDate: '2026-03-12',
      rent: 9500,
      status: 'Vacating',
      avatar: 'VS',
      type: 'tenant'
    },

    {
      id: 5,
      name: 'Rohit Singh',
      email: 'rohit.singh@gmail.com',
      phone: '+91 90000 11223',
      room: 'Room 101',
      bed: 'Bed B',
      joinDate: '2026-02-28',
      rent: 8500,
      status: 'Active',
      avatar: 'RS',
      type: 'tenant'
    },

    {
      id: 6,
      name: 'Sandeep Rao',
      email: 'sandeep.rao@gmail.com',
      phone: '+91 98888 77665',
      room: 'Room 102',
      bed: 'Bed A',
      joinDate: '2026-01-15',
      rent: 9000,
      status: 'Inactive',
      avatar: 'SR',
      type: 'tenant'
    },

    {
      id: 7,
      name: 'Manoj Kumar',
      email: 'manoj.kumar@gmail.com',
      phone: '+91 97777 66554',
      room: 'Room 103',
      bed: 'Bed B',
      joinDate: '2026-01-08',
      rent: 8500,
      status: 'Active',
      avatar: 'MK',
      type: 'tenant'
    },

    {
      id: 8,
      name: 'Ajay Varma',
      email: 'ajay.varma@gmail.com',
      phone: '+91 96666 55443',
      room: 'Room 104',
      bed: 'Bed A',
      joinDate: '2025-12-18',
      rent: 9500,
      status: 'Active',
      avatar: 'AV',
      type: 'tenant'
    },

    {
      id: 9,
      name: 'Naveen Babu',
      email: 'naveen.babu@gmail.com',
      phone: '+91 95555 44332',
      room: 'Room 101',
      bed: 'Bed C',
      joinDate: '2025-11-24',
      rent: 8500,
      status: 'Active',
      avatar: 'NB',
      type: 'tenant'
    },

    {
      id: 10,
      name: 'Praveen Kumar',
      email: 'praveen.kumar@gmail.com',
      phone: '+91 94444 33221',
      room: 'Room 102',
      bed: 'Bed C',
      joinDate: '2025-10-16',
      rent: 9000,
      status: 'Vacating',
      avatar: 'PK',
      type: 'tenant'
    },

    {
      id: 11,
      name: 'Rakesh Patel',
      email: 'rakesh.patel@gmail.com',
      phone: '+91 93333 22110',
      room: 'Room 103',
      bed: 'Bed C',
      joinDate: '2025-09-12',
      rent: 8500,
      status: 'Active',
      avatar: 'RP',
      type: 'tenant'
    },

    {
      id: 12,
      name: 'Aditya Rao',
      email: 'aditya.rao@gmail.com',
      phone: '+91 92222 11009',
      room: 'Room 104',
      bed: 'Bed B',
      joinDate: '2025-08-10',
      rent: 9500,
      status: 'Inactive',
      avatar: 'AR',
      type: 'tenant'
    }
  ];


  constructor(
    private router: Router
  ) { }


  ngOnInit(): void {

    /*
     * Keep this method ready for the API/service call.
     *
     * At present the page uses demo data so the UI
     * can be developed independently of the backend.
     */

    this.currentPage = 1;
  }


  // =========================================================
  // FILTERED TENANTS
  // =========================================================

  get filteredTenants(): Tenant[] {

    const search =
      this.searchValue
        .trim()
        .toLowerCase();

    const status =
      this.filterValues['status'] || '';

    const room =
      this.filterValues['room'] || '';


    return this.tenants.filter(
      tenant => {

        const matchesSearch =
          !search ||
          tenant.name
            .toLowerCase()
            .includes(search) ||
          tenant.email
            .toLowerCase()
            .includes(search) ||
          tenant.phone
            .toLowerCase()
            .includes(search) ||
          tenant.room
            .toLowerCase()
            .includes(search) ||
          tenant.bed
            .toLowerCase()
            .includes(search);


        const matchesStatus =
          !status ||
          tenant.status === status;


        const matchesRoom =
          !room ||
          tenant.room === room;


        return (
          matchesSearch &&
          matchesStatus &&
          matchesRoom
        );
      }
    );
  }


  // =========================================================
  // PAGINATED TENANTS
  // =========================================================

  get paginatedTenants(): Tenant[] {

    const start =
      (this.currentPage - 1) *
      this.pageSize;

    const end =
      start + this.pageSize;

    return this.filteredTenants.slice(
      start,
      end
    );
  }


  // =========================================================
  // SEARCH
  // =========================================================

  onSearchChange(
    value: string
  ): void {

    this.searchValue = value;

    this.currentPage = 1;
  }


  // =========================================================
  // FILTER
  // =========================================================

  onFilterChange(
    event: {
      key: string;
      value: string;
    }
  ): void {

    this.filterValues[event.key] =
      event.value;

    this.currentPage = 1;
  }


  // =========================================================
  // RESET
  // =========================================================

  onReset(): void {

    this.searchValue = '';

    this.filterValues = {};

    this.currentPage = 1;
  }


  // =========================================================
  // PAGINATION
  // =========================================================

  onPageChange(
    page: number
  ): void {

    this.currentPage = page;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  // =========================================================
  // ADD TENANT
  // =========================================================

  addTenant(): void {

    /*
     * The exact Add Tenant route is not present
     * in the uploaded navigation configuration,
     * so we don't invent one here.
     *
     * Add the route when it is available.
     */

    console.log(
      'Add Tenant clicked'
    );
    this.router.navigate(['/layout/add-tenant']);
  }


  // =========================================================
  // ROW CLICK
  // =========================================================

  onRowClick(
    row: DataTableRow
  ): void {

    console.log(
      'Tenant row clicked:',
      row
    );
  }


  // =========================================================
  // TABLE ACTION
  // =========================================================

  onTableAction(
    event: {
      action: ActionMenuItem;
      row: DataTableRow;
    }
  ): void {

    const tenant =
      event.row as Tenant;

    switch (
    event.action.value
    ) {

      case 'view':

        this.viewTenant(tenant);

        break;


      case 'edit':

        this.editTenant(tenant);

        break;


      case 'payments':

        this.viewPayments(tenant);

        break;


      case 'inactive':

        this.toggleTenantStatus(
          tenant
        );

        break;
    }
  }


  // =========================================================
  // MOBILE ACTION
  // =========================================================

  onMobileAction(
    event: {
      action: ActionMenuItem;
      row: DataTableRow;
    }
  ): void {

    this.onTableAction(
      event
    );
  }


  // =========================================================
  // VIEW TENANT
  // =========================================================

  viewTenant(
    tenant: Tenant
  ): void {

    /*
     * Tenant detail route has not been defined
     * in the uploaded navigation configuration.
     *
     * Keep the handler ready without inventing
     * a route.
     */

    console.log(
      'View tenant:',
      tenant
    );
  }


  // =========================================================
  // EDIT TENANT
  // =========================================================

  editTenant(
    tenant: Tenant
  ): void {

    console.log(
      'Edit tenant:',
      tenant
    );
  }


  // =========================================================
  // PAYMENTS
  // =========================================================

  viewPayments(
    tenant: Tenant
  ): void {

    console.log(
      'View payments:',
      tenant
    );
  }


  // =========================================================
  // STATUS
  // =========================================================

  toggleTenantStatus(
    tenant: Tenant
  ): void {

    tenant.status =
      tenant.status === 'Active'
        ? 'Inactive'
        : 'Active';
  }


  // =========================================================
  // MOBILE VIEW
  // =========================================================

  onMobileView(
    row: DataTableRow
  ): void {

    this.viewTenant(
      row as Tenant
    );
  }


  // =========================================================
  // TRACK
  // =========================================================

  trackTenant(
    index: number,
    tenant: Tenant
  ): number {

    return tenant.id;
  }
}