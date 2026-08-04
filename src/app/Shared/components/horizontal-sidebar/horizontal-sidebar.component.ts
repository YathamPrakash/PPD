import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-horizontal-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-sidebar.component.html',
  styleUrl: './horizontal-sidebar.component.scss'
})
export class HorizontalSidebarComponent {

  // menuItems = [
  //   {
  //     label: 'Dashboard',
  //     icon: 'fa-solid fa-house'
  //   },
  //   {
  //     label: 'Users',
  //     icon: 'fa-solid fa-users',
  //     open: false,
  //     children: [
  //       {
  //         label: 'User List',
  //         icon: 'fa-solid fa-user'
  //       },
  //       {
  //         label: 'Roles',
  //         icon: 'fa-solid fa-user-shield',
  //         open: false,
  //         children: [
  //           {
  //             label: 'Admin',
  //             icon: 'fa-solid fa-user-gear'
  //           },
  //           {
  //             label: 'Manager',
  //             icon: 'fa-solid fa-user-tie'
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Reports',
  //     icon: 'fa-solid fa-house'
  //   },
  // ];


  menuItems :any= [
    {
      label: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
      route: '/dashboard',
      children:[]
    },
    {
      label: 'Tenants',
      icon: 'fa-solid fa-users',
      route: '/tenants',
      children:[]
    },
    {
      label: 'Rooms & Beds',
      icon: 'fa-solid fa-bed',
      route: '/rooms',
      children:[]
    },
    {
      label: 'Booking',
      icon: 'fa-solid fa-calendar-check',
      route: '/booking/allocation',
      children:[]
    },
    {
      label: 'Payments',
      icon: 'fa-solid fa-money-bill-wave',
      route: '/payments/rent',
      children:[]
    },
    {
      label: 'Mess',
      icon: 'fa-solid fa-utensils',
      route: '/mess/menu',
      children:[]
    },
    {
      label: 'Maintenance',
      icon: 'fa-solid fa-screwdriver-wrench',
      route: '/maintenance/complaints',
      children:[]
    },
    {
      label: 'Visitors',
      icon: 'fa-solid fa-user-check',
      route: '/visitors/log',
      children:[]
    },
    {
      label: 'Reports',
      icon: 'fa-solid fa-chart-pie',
      route: '/reports/tenants',
      children:[]
    }
  ];
}
