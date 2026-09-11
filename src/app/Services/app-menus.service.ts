import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { menuItem } from '../Shared/models/data-model';
@Injectable({
  providedIn: 'root'
})
export class AppMenusService {

  constructor(private router: Router) { }

  menuItems: any = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/layout/dashboard'
    },

    {
      label: 'Tenants',
      icon: 'tenants',
      route: '/layout/tenants'
    },

    {
      label: 'Rooms & Beds',
      icon: 'rooms',
      children: [
        {
          label: 'Rooms',
          icon: 'rooms',
          route: '/layout/rooms'
        },
        {
          label: 'Beds',
          icon: 'beds',
          route: '/layout/beds'
        },
        {
          label: 'Floors',
          icon: 'floors',
          route: '/layout/floors'
        }
      ]
    },

    {
      label: 'Booking',
      icon: 'booking',
      children: [
        {
          label: 'All Bookings',
          icon: 'booking',
          route: '/layout/booking'
        },
        {
          label: 'Check-ins',
          icon: 'checkin',
          route: '/layout/booking/check-ins'
        },
        {
          label: 'Check-outs',
          icon: 'checkout',
          route: '/layout/booking/check-outs'
        }
      ]
    },

    {
      label: 'Payments',
      icon: 'payments',
      children: [
        {
          label: 'Rent',
          icon: 'payments',
          route: '/layout/payments/rent'
        },
        {
          label: 'Advance',
          icon: 'payments',
          route: '/layout/payments/advance'
        },
        {
          label: 'Payment History',
          icon: 'history',
          route: '/layout/payments/history'
        }
      ]
    },

    {
      label: 'Mess',
      icon: 'mess',
      route: '/layout/mess'
    },

    {
      label: 'Maintenance',
      icon: 'maintenance',
      children: [
        {
          label: 'Complaints',
          icon: 'maintenance',
          route: '/layout/maintenance/complaints'
        },
        {
          label: 'Requests',
          icon: 'maintenance',
          route: '/layout/maintenance/requests'
        }
      ]
    },

    {
      label: 'Visitors',
      icon: 'visitors',
      route: '/layout/visitors'
    },

    {
      label: 'Reports',
      icon: 'reports',
      children: [
        {
          label: 'Tenant Reports',
          icon: 'reports',
          route: '/layout/reports/tenants'
        },
        {
          label: 'Payment Reports',
          icon: 'reports',
          route: '/layout/reports/payments'
        },
        {
          label: 'Occupancy Reports',
          icon: 'reports',
          route: '/layout/reports/occupancy'
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
