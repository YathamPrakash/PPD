import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  tableData=[
    {
      userName:"Mark",
      roomNumber:101,
      roomRent:500,
      date:"2024-05-11",
      status:"Active",
      styleClass:"active"
    },
    {
      userName:"Mani",
      roomNumber:105,
      roomRent:600,
      date:"2025-05-01",
      status:"New",
      styleClass:"new"
    },
    {
      userName:"Bablu",
      roomNumber:106,
      roomRent:600,
      date:"2024-07-01",
      status:"On Hold",
      styleClass:"hold"
    }
  ]
   tableHeaders=Object.keys(this.tableData[0])

}
