import { Component } from '@angular/core';
import { DynamicTableComponent } from '../../Shared/components/dynamic-table/dynamic-table.component';
import { LazyTableService } from '../../Services/lazy-table.service';

@Component({
  selector: 'app-tenant-management',
  standalone: true,
  imports: [DynamicTableComponent],
  providers: [LazyTableService],
  templateUrl: './tenant-management.component.html',
  styleUrl: './tenant-management.component.scss'
})
export class TenantManagementComponent {
  tenantsData: any[] = [];
  totalRecords = 50000;
  loading = false;
  rows = 50;
  constructor(private lazyTableService: LazyTableService) {
    this.lazyTableService.getTenantsLazy({ first: 0, rows: 50 }).subscribe(res => {
      this.tenantsData = res.data;
    });
  }

  globalFilterFields = ['sno', 'name', 'phone', 'room', 'bed', 'status'];

  tenantsColumns = [
  { field: 'sno', header: 'S.No', width: '10%',filterType:'numeric',resizable:true },
  { field: 'name', header: 'Name', width: '20%' ,filterType:'text',resizable:true},
  { field: 'phone', header: 'Phone', width: '25%' ,filterType:'text',resizable:true},
  { field: 'room', header: 'Room', width: '15%' ,filterType:'text',resizable:true},
  { field: 'bed', header: 'Bed', width: '15%' ,filterType:'text',resizable:true},
  { field: 'status', header: 'Status', width: '20%' ,filterType:'dropdown',resizable:true}
];



}
