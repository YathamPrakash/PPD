import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { menuItem } from '../Shared/models/data-model';
@Injectable({
  providedIn: 'root'
})
export class AppMenusService {

  constructor(private router:Router) { }

   menuItems: menuItem[] = [
    {
      label: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
      route: '/layout/dashboard',
      children: []
    },
    {
      label: 'Tenants',
      icon: 'fa-solid fa-users',
      route: '/layout/tenantlist',
      children: []
    },
    {
      label: 'Rooms & Beds',
      icon: 'fa-solid fa-bed',
      route: '/rooms',
      children: []
    },
    {
      label: 'Booking',
      icon: 'fa-solid fa-calendar-check',
      route: '/booking/allocation',
      children: []
    },
    {
      label: 'Payments',
      icon: 'fa-solid fa-money-bill-wave',
      route: '/payments/rent',
      children: []
    },
    {
      label: 'Mess',
      icon: 'fa-solid fa-utensils',
      route: '/mess/menu',
      children: []
    },
    {
      label: 'Maintenance',
      icon: 'fa-solid fa-screwdriver-wrench',
      route: '/maintenance/complaints',
      children: []
    },
    {
      label: 'Visitors',
      icon: 'fa-solid fa-user-check',
      route: '/visitors/log',
      children: []
    },
    {
      label: 'Reports',
      icon: 'fa-solid fa-chart-pie',
      route: '/reports/tenants',
      children: []
    }
  ];

  _doNavigate(item: menuItem) {
    if (item.route) {
      this.router.navigate([item.route]);
    } else {
      console.warn('No route defined for', item.label);
    }
  }

}
