import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../Shared/components/table/table.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


interface StatCard {
  value: string;
  label: string;
  description: string;
  type: 'primary' | 'success' | 'warning' | 'info';
  icon: string;
  trend?: string;
}

interface PaymentCard {
  value: string;
  label: string;
  description: string;
  type: 'success' | 'warning' | 'info' | 'danger';
  icon: string;
  trend?: string;
}

interface Joining {
  initials: string;
  name: string;
  room: string;
  bed: string;
  date: string;
  rent: string;
  status: 'Active' | 'New';
}

interface Operation {
  title: string;
  description: string;
  count: number;
  type: 'warning' | 'danger' | 'info' | 'success';
  icon: string;
  route: string;
}

interface QuickAction {
  title: string;
  description: string;
  type: 'tenant' | 'room' | 'payment' | 'maintenance';
  icon: string;
  route: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableComponent, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  // ======================================================
  // PAGE CONTENT
  // ======================================================

  pageContent = {
    eyebrow: 'PG MANAGEMENT',
    greeting: 'Good morning, Manager!',
    description: "Here's what's happening with your PG today.",

    propertyEyebrow: 'PROPERTY OVERVIEW',
    propertyTitle: 'Property Overview',
    propertyDescription: 'Real-time occupancy status of your PG',
    propertyLink: 'View rooms & beds',

    financeEyebrow: 'FINANCIAL OVERVIEW',
    financeTitle: 'Financial Overview',
    financeLink: 'View payments',

    operationsEyebrow: 'DAILY OPERATIONS',
    operationsTitle: "What's happening",
    operationsDescription: 'Items that need your attention',

    quickActionsEyebrow: 'QUICK ACTIONS',
    quickActionsTitle: 'Manage your PG',
    quickActionsDescription: 'Common tasks to manage your PG',
  };


  // ======================================================
  // PROPERTY OVERVIEW
  // ======================================================

  propertyStats: StatCard[] = [

    {
      value: '156',
      label: 'Total Beds',
      description: 'Across 24 rooms',
      type: 'info',
      icon: 'bed'
    },

    {
      value: '138',
      label: 'Occupied Beds',
      description: '88.5% occupancy',
      type: 'success',
      icon: 'users',
      trend: '+12%'
    },

    {
      value: '18',
      label: 'Available Beds',
      description: 'Ready for booking',
      type: 'warning',
      icon: 'bed'
    },

    {
      value: '88.5%',
      label: 'Occupancy Rate',
      description: 'vs last month',
      type: 'success',
      icon: 'clock',
      trend: '+5%'
    }

  ];


  // ======================================================
  // FINANCIAL OVERVIEW
  // ======================================================

  paymentStats: PaymentCard[] = [

    {
      value: '₹1,25,000',
      label: 'Rent Collected',
      description: '92% of expected rent',
      type: 'success',
      icon: 'rupee',
      trend: '↑ 12% from last month'
    },

    {
      value: '₹18,500',
      label: 'Rent Pending',
      description: '12 tenants pending',
      type: 'warning',
      icon: 'clock'
    },

    {
      value: '₹42,000',
      label: 'Advance Received',
      description: '6 recent payments',
      type: 'info',
      icon: 'card'
    },

    {
      value: '₹6,700',
      label: 'Overdue Payments',
      description: 'Requires attention',
      type: 'danger',
      icon: 'warning'
    }

  ];


  // ======================================================
  // RECENT JOININGS
  // ======================================================

  recentJoinings: Joining[] = [

    {
      initials: 'RK',
      name: 'Rahul Kumar',
      room: 'Room 101',
      bed: 'Bed A',
      date: 'Sep 10, 2026',
      rent: '₹8,500',
      status: 'Active'
    },

    {
      initials: 'AS',
      name: 'Arjun Sharma',
      room: 'Room 204',
      bed: 'Bed B',
      date: 'Sep 09, 2026',
      rent: '₹7,500',
      status: 'Active'
    },

    {
      initials: 'VM',
      name: 'Vivek Menon',
      room: 'Room 305',
      bed: 'Bed A',
      date: 'Sep 08, 2026',
      rent: '₹9,000',
      status: 'New'
    },

    {
      initials: 'SP',
      name: 'Sneha Patel',
      room: 'Room 102',
      bed: 'Bed B',
      date: 'Sep 07, 2026',
      rent: '₹8,500',
      status: 'Active'
    },

    {
      initials: 'KR',
      name: 'Kiran Reddy',
      room: 'Room 201',
      bed: 'Bed A',
      date: 'Sep 06, 2026',
      rent: '₹7,000',
      status: 'Active'
    }

  ];


  // ======================================================
  // OPERATIONS
  // ======================================================

  operations: Operation[] = [

    {
      title: 'Maintenance Requests',
      description: '8 open requests',
      count: 8,
      type: 'warning',
      icon: 'maintenance',
      route: '/layout/maintenance'
    },

    {
      title: 'Complaints',
      description: '3 unresolved complaints',
      count: 3,
      type: 'danger',
      icon: 'complaint',
      route: '/layout/complaints'
    },

    {
      title: "Today's Visitors",
      description: 'Expected visitors',
      count: 6,
      type: 'info',
      icon: 'visitor',
      route: '/layout/visitors'
    },

    {
      title: 'Upcoming Check-ins',
      description: '4 scheduled this week',
      count: 4,
      type: 'success',
      icon: 'calendar',
      route: '/layout/booking'
    }

  ];


  // ======================================================
  // QUICK ACTIONS
  // ======================================================

  quickActions: QuickAction[] = [

    {
      title: 'Add Tenant',
      description: 'Register a new tenant',
      type: 'tenant',
      icon: 'tenant',
      route: '/layout/tenants'
    },

    {
      title: 'Add Room / Bed',
      description: 'Manage available beds',
      type: 'room',
      icon: 'bed',
      route: '/layout/rooms-beds'
    },

    {
      title: 'Record Payment',
      description: 'Add rent or advance',
      type: 'payment',
      icon: 'rupee',
      route: '/layout/payments'
    },

    {
      title: 'Create Maintenance',
      description: 'Log a maintenance request',
      type: 'maintenance',
      icon: 'maintenance',
      route: '/layout/maintenance'
    }

  ];


  // ======================================================
  // OCCUPANCY
  // ======================================================

  occupancyPercentage = 88.5;


  // ======================================================
  // TRACK BY
  // ======================================================

  trackByTitle(index: number, item: any): string {
    return item.title;
  }

  selectedMonth = this.getCurrentMonth();

  private getCurrentMonth(): string {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${year}-${month}`;
  }

  onMonthChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.selectedMonth = input.value;

    console.log('Selected month:', this.selectedMonth);

    // Later:
    // this.dashboardService.getDashboard(this.selectedMonth)
    //   .subscribe(data => {
    //      ...
    //   });
  }

  get selectedMonthLabel(): string {
    if (!this.selectedMonth) {
      return '';
    }

    const [year, month] = this.selectedMonth.split('-').map(Number);

    const date = new Date(year, month - 1, 1);

    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  }
}