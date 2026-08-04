import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [TableModule,CommonModule , MultiSelectModule,FormsModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent {
  @Input() headers:any[]=[];
  @Input() data:any[]=[];
  @Input() totalRecords:number=0;
  @Input() loading:boolean=false;
  @Input() rows:number=50;             // page size dynamic
  @Input() paginator:boolean=true;     // to show/hide paginator
  @Input() rowsPerPageOptions:number[]=[5, 10, 20];
  @Input() globalFilterFields:any=[]
  @Input() resizableColumns: boolean = false;
  selectedColumns:any[]=[];

ngOnChanges(){
  this.selectedColumns = this.headers;
}

ngOnInit(){
  console.log(this.data,"data in dynamic table noOninit");
}
  @Output() lazyLoad = new EventEmitter<LazyLoadEvent>();

  loadData(event:any){
    this.lazyLoad.emit(event);
  }

}
