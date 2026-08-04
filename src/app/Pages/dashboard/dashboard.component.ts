import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../Shared/components/table/table.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentDate= new Date();
  userImagePath = '/Images/userImage.png';

 tenantsData = [
  {
    label: 'Total Tenants',
    value: 15678,
    icon: 'fa-solid fa-users' ,
    iconColor:""
  },
  {
    label: 'Active Tenants',
    value: 1067,
    icon: 'fa-solid fa-user-check',
    iconColor:""
  },
  {
    label: 'Total Complaints',
    value: 158,
    icon: 'fa-solid fa-comment-exclamation',
    iconColor:""
  },
  {
    label: 'Active Complaints',
    value: 67,
    icon: 'fa-solid fa-bell',
    iconColor:"" 
  }
];


paymentsData = [
  {
    label: 'Received Advance',
    value: 15678,
    iconColor:"" ,
    count:10,
    icon: 'fa-solid fa-money-bill-wave'
  },
  {
    label: 'Received Rent',
    value: 1067,
    count:6,
    iconColor:"" ,
    icon: 'fa-solid fa-hand-holding-dollar'
  },
  {
    label: 'Rent Dues',
    value: 158,
    count:5,
    iconColor:"", 
    icon: 'fa-solid fa-calendar-times'
  },
  {
    label: 'Over Rent Dues',
    value: 67,
    iconColor:"danger",
    count:5,
    icon: 'fa-solid fa-exclamation-triangle'
  }
];


upcomingJoinings=
[
  {
    name:"Miller",
    date:"2025-12-03",
    room:"101",
    country:"USA"
  },
  {
    name:"David",
    date:"2026-10-13",
    room:"102",
    country:"India"
  },
   {
    name:"Jayram",
    date:"2023-10-30",
    room:"103",
    country:"Canada"
  }
]


}
