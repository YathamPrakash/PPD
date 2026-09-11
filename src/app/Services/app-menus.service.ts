import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { menuItem } from '../Shared/models/data-model';
@Injectable({
  providedIn: 'root'
})
export class AppMenusService {

  constructor(private router:Router) { }

  menuItems: menuItem[] = [

    // =========================================================
    // DASHBOARD
    // =========================================================

    {
      label: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
      route: '/layout/dashboard',
      children: []
    },
    

    // =========================================================
    // TENANTS
    // =========================================================

    {
      label: 'Tenants',
      icon: 'fa-solid fa-users',
      route: '/layout/tenantlist',
      children: []
    },


    // =========================================================
    // ROOMS & BEDS
    // =========================================================

    {
      label: 'Rooms & Beds',
      icon: 'fa-solid fa-bed',
      route: '',
      children: [

        {
          label: 'Rooms',
          icon: 'fa-solid fa-door-open',
          route: '/layout/rooms',
          children: []
        },

        {
          label: 'Beds',
          icon: 'fa-solid fa-bed',
          route: '/layout/beds',
          children: []
        },

        {
          label: 'Floors',
          icon: 'fa-solid fa-building',
          route: '/layout/floors',
          children: []
        }

      ]
    },


    // =========================================================
    // BOOKING
    // =========================================================

    {
      label: 'Booking',
      icon: 'fa-solid fa-calendar-check',
      route: '',
      children: [

        {
          label: 'All Bookings',
          icon: 'fa-solid fa-calendar-days',
          route: '/layout/booking',
          children: []
        },

        {
          label: 'Check-ins',
          icon: 'fa-solid fa-right-to-bracket',
          route: '/layout/booking/check-ins',
          children: []
        },

        {
          label: 'Check-outs',
          icon: 'fa-solid fa-right-from-bracket',
          route: '/layout/booking/check-outs',
          children: []
        }

      ]
    },


    // =========================================================
    // PAYMENTS
    // =========================================================

    {
      label: 'Payments',
      icon: 'fa-solid fa-money-bill-wave',
      route: '',
      children: [

        {
          label: 'Rent',
          icon: 'fa-solid fa-money-bill',
          route: '/layout/payments/rent',
          children: []
        },

        {
          label: 'Advance',
          icon: 'fa-solid fa-wallet',
          route: '/layout/payments/advance',
          children: []
        },

        {
          label: 'Payment History',
          icon: 'fa-solid fa-clock-rotate-left',
          route: '/layout/payments/history',
          children: []
        }

      ]
    },


    // =========================================================
    // MESS
    // =========================================================

    {
      label: 'Mess',
      icon: 'fa-solid fa-utensils',
      route: '',
      children: [

        {
          label: 'Menu',
          icon: 'fa-solid fa-list',
          route: '/layout/mess/menu',
          children: []
        },

        {
          label: 'Meal Plans',
          icon: 'fa-solid fa-bowl-food',
          route: '/layout/mess/meal-plans',
          children: []
        }

      ]
    },


    // =========================================================
    // MAINTENANCE
    // =========================================================

    {
      label: 'Maintenance',
      icon: 'fa-solid fa-screwdriver-wrench',
      route: '',
      children: [

        {
          label: 'Complaints',
          icon: 'fa-solid fa-circle-exclamation',
          route: '/layout/maintenance/complaints',
          children: []
        },

        {
          label: 'Requests',
          icon: 'fa-solid fa-list-check',
          route: '/layout/maintenance/requests',
          children: []
        }

      ]
    },


    // =========================================================
    // VISITORS
    // =========================================================

    {
      label: 'Visitors',
      icon: 'fa-solid fa-user-check',
      route: '',
      children: [

        {
          label: 'Visitor Log',
          icon: 'fa-solid fa-clipboard-list',
          route: '/layout/visitors/log',
          children: []
        },

        {
          label: 'Expected Visitors',
          icon: 'fa-solid fa-user-clock',
          route: '/layout/visitors/expected',
          children: []
        }

      ]
    },


    // =========================================================
    // REPORTS
    // =========================================================

    {
      label: 'Reports',
      icon: 'fa-solid fa-chart-pie',
      route: '',
      children: [

        {
          label: 'Tenant Report',
          icon: 'fa-solid fa-users',
          route: '/layout/reports/tenants',
          children: []
        },

        {
          label: 'Payment Report',
          icon: 'fa-solid fa-file-invoice-dollar',
          route: '/layout/reports/payments',
          children: []
        },

        {
          label: 'Occupancy Report',
          icon: 'fa-solid fa-chart-column',
          route: '/layout/reports/occupancy',
          children: []
        }

      ]
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
