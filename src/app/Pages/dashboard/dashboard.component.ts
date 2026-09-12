import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';

import {
  Chart,
  ChartConfiguration,
  registerables
} from 'chart.js';

import {
  PageHeaderComponent
} from '../../Shared/components/page-header/page-header.component';

import {
  StatCardComponent
} from '../../Shared/components/stat-card/stat-card.component';

import {
  ChartCardComponent,
  ChartCardAction,
  ChartMenuAction
} from '../../Shared/components/chart-card/chart-card.component';

import {
  TimelineComponent,
  TimelineItem
} from '../../Shared/components/timeline/timeline.component';


Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    PageHeaderComponent,
    StatCardComponent,
    ChartCardComponent,
    TimelineComponent
  ],

  templateUrl: './dashboard.component.html',

  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

 constructor(private router: Router) {}
  /* =========================================================
     PAGE
     ========================================================= */

  pageTitle = 'Dashboard';

  pageDescription =
    'Overview of your property management';



  /* =========================================================
     CHART THEME
     ========================================================= */

  /*
   * Theme-compatible teal.
   *
   * This is intentionally restrained so the chart
   * matches the green/teal StayNest sidebar theme.
   */

  private readonly chartPrimaryColor =
    '#0F766E';

  private readonly chartPrimaryFill =
    'rgba(15, 118, 110, 0.10)';

  private readonly chartGridColor =
    'rgba(100, 116, 139, 0.16)';

  private readonly chartTextColor =
    '#64748B';


  /* =========================================================
     CHART REFERENCES
     ========================================================= */

  @ViewChild('revenueChart')
  revenueChartRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('occupancyChart')
  occupancyChartRef!: ElementRef<HTMLCanvasElement>;


  private revenueChart?: Chart<'line'>;

  private occupancyChart?: Chart<'bar'>;


  /* =========================================================
     STATISTICS
     ========================================================= */

  statistics = [

    {
      label: 'Total Rooms',
      value: '24',
      description: 'Across all properties',
      icon: 'fa-solid fa-door-open',
      variant: 'blue' as const
    },

    {
      label: 'Occupied Rooms',
      value: '18',
      description: '75% occupancy',
      icon: 'fa-solid fa-bed',
      variant: 'green' as const
    },

    {
      label: 'Available Rooms',
      value: '6',
      description: 'Ready for tenants',
      icon: 'fa-solid fa-house',
      variant: 'orange' as const
    },

    {
      label: 'Monthly Revenue',
      value: '₹1,84,500',
      description: 'Current month',
      icon: 'fa-solid fa-indian-rupee-sign',
      variant: 'teal' as const
    }

  ];


  /* =========================================================
     REVENUE FILTER
     ========================================================= */

  revenuePeriod = 'monthly';

  revenueActions: ChartCardAction[] = [

    {
      label: 'This Month',
      value: 'monthly'
    },

    {
      label: 'This Quarter',
      value: 'quarterly'
    },

    {
      label: 'This Year',
      value: 'yearly'
    }

  ];


  /* =========================================================
     OCCUPANCY FILTER
     ========================================================= */

  occupancyPeriod = 'monthly';

  occupancyActions: ChartCardAction[] = [

    {
      label: 'This Month',
      value: 'monthly'
    },

    {
      label: 'Last Month',
      value: 'last-month'
    },

    {
      label: 'This Year',
      value: 'yearly'
    }

  ];


  /* =========================================================
     RECENT ACTIVITY
     ========================================================= */

  recentActivities: TimelineItem[] = [

    {
      id: 'activity-1',

      title: 'New tenant added',

      description:
        'A new tenant was added to Room 204.',

      date: 'Today',

      time: '10:42 AM',

      type: 'success',

      icon: 'fa-solid fa-user-plus',

      meta: 'Room 204'
    },


    {
      id: 'activity-2',

      title: 'Rent payment received',

      description:
        'Payment of ₹12,500 received from Room 102.',

      date: 'Today',

      time: '09:18 AM',

      type: 'success',

      icon: 'fa-solid fa-indian-rupee-sign',

      meta: '₹12,500'
    },


    {
      id: 'activity-3',

      title: 'Room marked available',

      description:
        'Room 308 is now available for a new tenant.',

      date: 'Yesterday',

      time: '04:30 PM',

      type: 'info',

      icon: 'fa-solid fa-door-open',

      meta: 'Room 308'
    },


    {
      id: 'activity-4',

      title: 'Payment overdue',

      description:
        'Rent payment for Room 115 is overdue.',

      date: 'Yesterday',

      time: '11:20 AM',

      type: 'warning',

      icon: 'fa-solid fa-triangle-exclamation',

      meta: 'Room 115'
    }

  ];


  /* =========================================================
     LIFECYCLE
     ========================================================= */

  ngAfterViewInit(): void {

    this.createRevenueChart();

    this.createOccupancyChart();

  }


  ngOnDestroy(): void {

    this.revenueChart?.destroy();

    this.occupancyChart?.destroy();

  }


  /* =========================================================
     HEADER ACTIONS
     ========================================================= */

  onAddRoom(): void {

    console.log('Add Room');

  }


  onAddTenant(): void {
    console.log('Add Tenant');
      this.router.navigate(['/layout/add-tenant']);

  }


  /* =========================================================
     ACTIVITY
     ========================================================= */

  onActivityClick(
    item: TimelineItem
  ): void {

    console.log(
      'Activity clicked:',
      item
    );

  }


  onViewAllActivity(): void {

    console.log(
      'View all activity'
    );

  }


  /* =========================================================
     REVENUE PERIOD
     ========================================================= */

  onRevenuePeriodChange(
    period: string
  ): void {

    this.revenuePeriod = period;

    this.updateRevenueChart();

  }


  /* =========================================================
     OCCUPANCY PERIOD
     ========================================================= */

  onOccupancyPeriodChange(
    period: string
  ): void {

    this.occupancyPeriod = period;

    this.updateOccupancyChart();

  }


  /* =========================================================
     REVENUE MENU
     ========================================================= */

  onRevenueMenuAction(
    action: ChartMenuAction
  ): void {

    switch (action) {

      case 'view':

        this.viewRevenueDetails();

        break;


      case 'export':

        this.exportRevenueData();

        break;


      case 'fullscreen':

        /*
         * Fullscreen is handled by the
         * reusable ChartCardComponent.
         */

        break;

    }

  }


  /* =========================================================
     OCCUPANCY MENU
     ========================================================= */

  onOccupancyMenuAction(
    action: ChartMenuAction
  ): void {

    switch (action) {

      case 'view':

        this.viewOccupancyDetails();

        break;


      case 'export':

        this.exportOccupancyData();

        break;


      case 'fullscreen':

        /*
         * Fullscreen is handled by the
         * reusable ChartCardComponent.
         */

        break;

    }

  }


  /* =========================================================
     REVENUE DETAILS
     ========================================================= */

  private viewRevenueDetails(): void {

    const data =
      this.getRevenueData();


    const total =
      data.values.reduce(
        (sum, value) =>
          sum + value,
        0
      );


    const average =
      data.values.length
        ? total / data.values.length
        : 0;


    const highest =
      Math.max(...data.values);


    const highestIndex =
      data.values.indexOf(highest);


    const highestPeriod =
      data.labels[highestIndex] ?? '-';


    window.alert(

      [
        'Revenue Overview',

        '',

        `Period: ${this.getRevenuePeriodLabel()
        }`,

        `Total: ${this.formatCurrency(total)
        }`,

        `Average: ${this.formatCurrency(average)
        }`,

        `Highest: ${this.formatCurrency(highest)
        }`,

        `Highest period: ${highestPeriod
        }`

      ].join('\n')

    );

  }


  /* =========================================================
     OCCUPANCY DETAILS
     ========================================================= */

  private viewOccupancyDetails(): void {

    const data =
      this.getOccupancyData();


    const average =
      data.values.length
        ? data.values.reduce(
          (sum, value) =>
            sum + value,
          0
        ) / data.values.length
        : 0;


    const highest =
      Math.max(...data.values);


    const highestIndex =
      data.values.indexOf(highest);


    const highestPeriod =
      data.labels[highestIndex] ?? '-';


    window.alert(

      [
        'Occupancy Overview',

        '',

        `Period: ${this.getOccupancyPeriodLabel()
        }`,

        `Average occupancy: ${average.toFixed(1)
        }%`,

        `Highest occupancy: ${highest
        }%`,

        `Highest period: ${highestPeriod
        }`,

        '',

        'Currently occupied: 18 of 24 rooms',

        'Current occupancy: 75%'

      ].join('\n')

    );

  }


  /* =========================================================
     EXPORT REVENUE
     ========================================================= */

  private exportRevenueData(): void {

    const data =
      this.getRevenueData();


    const rows: string[] = [

      'Period,Revenue'

    ];


    data.labels.forEach(
      (label, index) => {

        const value =
          data.values[index] ?? 0;


        rows.push(
          `"${label}",${value}`
        );

      }
    );


    this.downloadCsv(
      'revenue-overview.csv',
      rows.join('\n')
    );

  }


  /* =========================================================
     EXPORT OCCUPANCY
     ========================================================= */

  private exportOccupancyData(): void {

    const data =
      this.getOccupancyData();


    const rows: string[] = [

      'Period,Occupancy (%)'

    ];


    data.labels.forEach(
      (label, index) => {

        const value =
          data.values[index] ?? 0;


        rows.push(
          `"${label}",${value}`
        );

      }
    );


    this.downloadCsv(
      'occupancy-overview.csv',
      rows.join('\n')
    );

  }


  /* =========================================================
     CSV DOWNLOAD
     ========================================================= */

  private downloadCsv(
    filename: string,
    csv: string
  ): void {

    const blob =
      new Blob(
        [csv],
        {
          type:
            'text/csv;charset=utf-8;'
        }
      );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement('a');


    link.href = url;

    link.download = filename;

    link.style.display = 'none';


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

  }


  /* =========================================================
     REVENUE CHART
     ========================================================= */

  private createRevenueChart(): void {

    const canvas =
      this.revenueChartRef?.nativeElement;


    if (!canvas) {
      return;
    }


    const context =
      canvas.getContext('2d');


    if (!context) {
      return;
    }


    const data =
      this.getRevenueData();


    const configuration:
      ChartConfiguration<'line'> = {

      type: 'line',


      data: {

        labels: data.labels,


        datasets: [

          {

            label: 'Revenue',

            data: data.values,

            borderColor:
              this.chartPrimaryColor,

            borderWidth: 3,

            backgroundColor:
              this.chartPrimaryFill,

            fill: true,

            tension: 0.35,

            pointRadius: 0,

            pointHoverRadius: 5,

            pointBackgroundColor:
              this.chartPrimaryColor,

            pointBorderColor:
              '#ffffff',

            pointBorderWidth: 2

          }

        ]

      },


      options: {

        responsive: true,

        maintainAspectRatio: false,


        interaction: {

          intersect: false,

          mode: 'index'

        },


        animation: {

          duration: 600

        },


        plugins: {

          legend: {

            display: false

          },


          tooltip: {

            displayColors: false,

            backgroundColor:
              '#1E293B',

            titleColor:
              '#ffffff',

            bodyColor:
              '#ffffff',

            padding: 12,

            cornerRadius: 8,


            callbacks: {

              label: (context) => {

                const value =
                  context.parsed.y ?? 0;


                return (
                  `Revenue: ${this.formatCurrency(value)
                  }`
                );

              }

            }

          }

        },


        scales: {

          x: {

            grid: {

              display: false

            },

            border: {

              display: false

            },

            ticks: {

              color:
                this.chartTextColor,

              font: {

                size: 13

              },

              padding: 10

            }

          },


          y: {

            beginAtZero: true,

            border: {

              display: false

            },

            grid: {

              color:
                this.chartGridColor

            },

            ticks: {

              color:
                this.chartTextColor,

              font: {

                size: 12

              },

              padding: 8,

              callback: (value) =>
                this.formatCompactCurrency(
                  Number(value)
                )

            }

          }

        }

      }

    };


    this.revenueChart =
      new Chart(
        context,
        configuration
      );

  }


  /* =========================================================
     OCCUPANCY CHART
     ========================================================= */

  private createOccupancyChart(): void {

    const canvas =
      this.occupancyChartRef?.nativeElement;


    if (!canvas) {
      return;
    }


    const context =
      canvas.getContext('2d');


    if (!context) {
      return;
    }


    const data =
      this.getOccupancyData();


    const configuration:
      ChartConfiguration<'bar'> = {

      type: 'bar',


      data: {

        labels: data.labels,


        datasets: [

          {

            label: 'Occupancy',

            data: data.values,

            backgroundColor:
              this.chartPrimaryColor,

            borderRadius: 7,

            borderSkipped: false,

            barPercentage: 0.58,

            categoryPercentage: 0.72

          }

        ]

      },


      options: {

        responsive: true,

        maintainAspectRatio: false,


        animation: {

          duration: 500

        },


        plugins: {

          legend: {

            display: false

          },


          tooltip: {

            displayColors: false,

            backgroundColor:
              '#1E293B',

            titleColor:
              '#ffffff',

            bodyColor:
              '#ffffff',

            padding: 12,

            cornerRadius: 8,


            callbacks: {

              label: (context) =>
                `Occupancy: ${context.parsed.y ?? 0
                }%`

            }

          }

        },


        scales: {

          x: {

            grid: {

              display: false

            },

            border: {

              display: false

            },

            ticks: {

              color:
                this.chartTextColor,

              font: {

                size: 13

              },

              padding: 10

            }

          },


          y: {

            beginAtZero: true,

            max: 100,

            border: {

              display: false

            },

            grid: {

              color:
                this.chartGridColor

            },

            ticks: {

              color:
                this.chartTextColor,

              font: {

                size: 12

              },

              padding: 8,

              callback: (value) =>
                `${value}%`

            }

          }

        }

      }

    };


    this.occupancyChart =
      new Chart(
        context,
        configuration
      );

  }


  /* =========================================================
     UPDATE REVENUE
     ========================================================= */

  private updateRevenueChart(): void {

    if (!this.revenueChart) {
      return;
    }


    const data =
      this.getRevenueData();


    this.revenueChart.data.labels =
      data.labels;


    this.revenueChart.data.datasets[0].data =
      data.values;


    this.revenueChart.update();

  }


  /* =========================================================
     UPDATE OCCUPANCY
     ========================================================= */

  private updateOccupancyChart(): void {

    if (!this.occupancyChart) {
      return;
    }


    const data =
      this.getOccupancyData();


    this.occupancyChart.data.labels =
      data.labels;


    this.occupancyChart.data.datasets[0].data =
      data.values;


    this.occupancyChart.update();

  }


  /* =========================================================
     REVENUE DATA
     ========================================================= */

  private getRevenueData(): {
    labels: string[];
    values: number[];
  } {

    switch (this.revenuePeriod) {

      case 'quarterly':

        return {

          labels: [
            'Jul',
            'Aug',
            'Sep'
          ],

          values: [
            162000,
            174500,
            184500
          ]

        };


      case 'yearly':

        return {

          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],

          values: [
            142000,
            148500,
            151000,
            158000,
            161500,
            169000,
            162000,
            174500,
            184500,
            0,
            0,
            0
          ]

        };


      default:

        return {

          labels: [
            'Week 1',
            'Week 2',
            'Week 3',
            'Week 4'
          ],

          values: [
            38500,
            42100,
            47200,
            56600
          ]

        };

    }

  }


  /* =========================================================
     OCCUPANCY DATA
     ========================================================= */

  private getOccupancyData(): {
    labels: string[];
    values: number[];
  } {

    switch (this.occupancyPeriod) {

      case 'last-month':

        return {

          labels: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
          ],

          values: [
            67,
            71,
            69,
            78,
            73,
            84,
            76
          ]

        };


      case 'yearly':

        return {

          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep'
          ],

          values: [
            62,
            65,
            68,
            70,
            72,
            69,
            73,
            74,
            75
          ]

        };


      default:

        return {

          labels: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
          ],

          values: [
            68,
            74,
            71,
            82,
            77,
            88,
            80
          ]

        };

    }

  }


  /* =========================================================
     PERIOD LABELS
     ========================================================= */

  private getRevenuePeriodLabel(): string {

    switch (this.revenuePeriod) {

      case 'quarterly':
        return 'This Quarter';

      case 'yearly':
        return 'This Year';

      default:
        return 'This Month';

    }

  }


  private getOccupancyPeriodLabel(): string {

    switch (this.occupancyPeriod) {

      case 'last-month':
        return 'Last Month';

      case 'yearly':
        return 'This Year';

      default:
        return 'This Month';

    }

  }


  /* =========================================================
     CURRENCY
     ========================================================= */

  private formatCurrency(
    value: number
  ): string {

    return new Intl.NumberFormat(
      'en-IN',
      {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }
    ).format(value);

  }


  private formatCompactCurrency(
    value: number
  ): string {

    if (value >= 100000) {

      return `₹${(
        value / 100000
      ).toFixed(1)}L`;

    }


    if (value >= 1000) {

      return `₹${(
        value / 1000
      ).toFixed(0)}K`;

    }
    return `₹${value}`;
  }

}