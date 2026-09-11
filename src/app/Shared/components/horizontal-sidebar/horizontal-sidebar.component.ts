import {
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-horizontal-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-sidebar.component.html',
  styleUrl: './horizontal-sidebar.component.scss'
})
export class HorizontalSidebarComponent {
  menuItems: any[] = [
    {
      label: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
      route: '/dashboard',
      children: []
    },
    {
      label: 'Tenants',
      icon: 'fa-solid fa-users',
      route: '/tenants',
      children: [
        {
          label: 'Tenant List',
          icon: 'fa-solid fa-list',
          route: '/tenants',
          children: []
        },
        {
          label: 'Tenant History',
          icon: 'fa-solid fa-clock-rotate-left',
          route: '/tenants/history',
          children: []
        }
      ]
    },
    {
      label: 'Rooms & Beds',
      icon: 'fa-solid fa-bed',
      route: '/rooms',
      children: [
        {
          label: 'Rooms',
          icon: 'fa-solid fa-door-open',
          route: '/rooms',
          children: [
            {
              label: 'All Rooms',
              icon: 'fa-solid fa-list',
              route: '/rooms/all',
              children: []
            },
            {
              label: 'Add Room',
              icon: 'fa-solid fa-plus',
              route: '/rooms/add',
              children: []
            }
          ]
        },
        {
          label: 'Beds',
          icon: 'fa-solid fa-bed',
          route: '/beds',
          children: [
            {
              label: 'All Beds',
              icon: 'fa-solid fa-list',
              route: '/beds/all',
              children: []
            },
            {
              label: 'Add Bed',
              icon: 'fa-solid fa-plus',
              route: '/beds/add',
              children: []
            }
          ]
        }
      ]
    },
    {
      label: 'Booking',
      icon: 'fa-solid fa-calendar-check',
      route: '/booking/allocation',
      children: [
        {
          label: 'All Bookings',
          icon: 'fa-solid fa-list',
          route: '/booking',
          children: []
        },
        {
          label: 'Allocation',
          icon: 'fa-solid fa-calendar-check',
          route: '/booking/allocation',
          children: []
        }
      ]
    },
    {
      label: 'Payments',
      icon: 'fa-solid fa-money-bill-wave',
      route: '/payments/rent',
      children: [
        {
          label: 'Rent',
          icon: 'fa-solid fa-money-bill',
          route: '/payments/rent',
          children: []
        },
        {
          label: 'Payment History',
          icon: 'fa-solid fa-clock-rotate-left',
          route: '/payments/history',
          children: []
        }
      ]
    },
    {
      label: 'Mess',
      icon: 'fa-solid fa-utensils',
      route: '/mess/menu',
      children: [
        {
          label: 'Menu',
          icon: 'fa-solid fa-list',
          route: '/mess/menu',
          children: []
        },
        {
          label: 'Attendance',
          icon: 'fa-solid fa-user-check',
          route: '/mess/attendance',
          children: []
        }
      ]
    },
    {
      label: 'Maintenance',
      icon: 'fa-solid fa-screwdriver-wrench',
      route: '/maintenance/complaints',
      children: [
        {
          label: 'Complaints',
          icon: 'fa-solid fa-triangle-exclamation',
          route: '/maintenance/complaints',
          children: []
        },
        {
          label: 'Requests',
          icon: 'fa-solid fa-screwdriver-wrench',
          route: '/maintenance/requests',
          children: []
        }
      ]
    },
    {
      label: 'Visitors',
      icon: 'fa-solid fa-user-check',
      route: '/visitors/log',
      children: [
        {
          label: 'Visitor Log',
          icon: 'fa-solid fa-list',
          route: '/visitors/log',
          children: []
        },
        {
          label: 'Visitor History',
          icon: 'fa-solid fa-clock-rotate-left',
          route: '/visitors/history',
          children: []
        }
      ]
    },
    {
      label: 'Reports',
      icon: 'fa-solid fa-chart-pie',
      route: '/reports/tenants',
      children: [
        {
          label: 'Tenant Reports',
          icon: 'fa-solid fa-users',
          route: '/reports/tenants',
          children: []
        },
        {
          label: 'Payment Reports',
          icon: 'fa-solid fa-money-bill',
          route: '/reports/payments',
          children: []
        }
      ]
    }
  ];
  // ==============================================================
  // OPEN STATE
  // ==============================================================
  openMenu: any = null;
  openSubmenu: any = null;
  submenuPosition = { top: 0, left: 0 };
  childmenuPosition = { top: 0, left: 0 };
  @ViewChild('submenuPopup') submenuPopupRef?: ElementRef<HTMLElement>;
  @ViewChild('childmenuPopup') childmenuPopupRef?: ElementRef<HTMLElement>;
  // ==============================================================
  // INTERNAL STATE
  // ==============================================================
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  /*
   * The element that triggered whichever popup is open, kept so we
   * can re-measure it (and reclamp position) after an auto-scroll
   * settles.
   */
  private openMenuTriggerEl: HTMLElement | null = null;
  private openSubmenuTriggerEl: HTMLElement | null = null;
  /*
   * True only while a scroll was started BY US (scrollIntoView), so
   * onBarScroll() below can tell that apart from a real user swipe.
   */
  private isAutoScrolling = false;
  private scrollSettleTimer: ReturnType<typeof setTimeout> | null = null;
  constructor(
    private elRef: ElementRef<HTMLElement>
  ) {}
  private supportsHover(): boolean {
    return (
      typeof window !== 'undefined' &&
      !!window.matchMedia &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    );
  }
  // ==============================================================
  // CLICK / TAP — works on every device
  // ==============================================================
  toggleMenu(menu: any, event: MouseEvent): void {
    event.stopPropagation();
    if (!menu?.children?.length) {
      return;
    }
    if (this.openMenu === menu) {
      this.openMenu = null;
      this.openSubmenu = null;
      this.openMenuTriggerEl = null;
      return;
    }
    const target = event.currentTarget as HTMLElement;
    this.openMenuTriggerEl = target;
    this.openMenu = menu;
    this.openSubmenu = null;
    this.positionSubmenu(target);
    this.scrollIntoViewIfNeeded(target);
  }
  toggleSubmenu(submenu: any, event: MouseEvent): void {
    event.stopPropagation();
    if (!submenu?.children?.length) {
      return;
    }
    if (this.openSubmenu === submenu) {
      this.openSubmenu = null;
      this.openSubmenuTriggerEl = null;
      return;
    }
    const target = event.currentTarget as HTMLElement;
    this.openSubmenuTriggerEl = target;
    this.openSubmenu = submenu;
    this.positionChildmenu(target);
  }
  // ==============================================================
  // HOVER (desktop / fine-pointer devices only)
  // ==============================================================
  onMenuEnter(menu: any, event: MouseEvent): void {
    if (!this.supportsHover()) {
      return;
    }
    this.cancelCloseTimer();
    if (!menu?.children?.length) {
      this.openMenu = null;
      this.openSubmenu = null;
      return;
    }
    const target = event.currentTarget as HTMLElement;
    this.openMenuTriggerEl = target;
    this.openMenu = menu;
    this.openSubmenu = null;
    this.positionSubmenu(target);
  }
  onSubmenuEnter(submenu: any, event: MouseEvent): void {
    if (!this.supportsHover()) {
      return;
    }
    this.cancelCloseTimer();
    if (!submenu?.children?.length) {
      this.openSubmenu = null;
      return;
    }
    const target = event.currentTarget as HTMLElement;
    this.openSubmenuTriggerEl = target;
    this.openSubmenu = submenu;
    this.positionChildmenu(target);
  }
  onMenuLeave(): void {
    if (this.supportsHover()) {
      this.scheduleClose();
    }
  }
  onSubmenuLeave(): void {
    if (this.supportsHover()) {
      this.scheduleClose();
    }
  }
  onPopupEnter(): void {
    this.cancelCloseTimer();
  }
  onPopupLeave(): void {
    if (this.supportsHover()) {
      this.scheduleClose();
    }
  }
  private scheduleClose(): void {
    this.cancelCloseTimer();
    this.closeTimer = setTimeout(() => {
      this.openMenu = null;
      this.openSubmenu = null;
      this.openMenuTriggerEl = null;
      this.openSubmenuTriggerEl = null;
      this.closeTimer = null;
    }, 150);
  }
  private cancelCloseTimer(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
  // ==============================================================
  // POSITIONING
  // ==============================================================
  //
  // Placed immediately from the trigger's rect (so it appears with
  // no visible delay), then re-checked one tick later against the
  // popup's REAL rendered width — labels vary in length, so a fixed
  // CSS min-width isn't enough to know whether it'll overflow the
  // screen edge.
  //
  private positionSubmenu(target: HTMLElement): void {
    const rect = target.getBoundingClientRect();
    this.submenuPosition = { top: rect.bottom, left: rect.left };
    setTimeout(() => this.clampSubmenuPosition(rect), 0);
  }
  private positionChildmenu(target: HTMLElement): void {
    const rect = target.getBoundingClientRect();
    this.childmenuPosition = { top: rect.top, left: rect.right + 8 };
    setTimeout(() => this.clampChildmenuPosition(rect), 0);
  }
  private clampSubmenuPosition(triggerRect: DOMRect): void {
    const el = this.submenuPopupRef?.nativeElement;
    if (!el) {
      return;
    }
    const margin = 8;
    const width = el.offsetWidth;
    const maxLeft = window.innerWidth - width - margin;
    this.submenuPosition = {
      top: this.submenuPosition.top,
      left: Math.max(margin, Math.min(triggerRect.left, maxLeft))
    };
  }
  private clampChildmenuPosition(triggerRect: DOMRect): void {
    const el = this.childmenuPopupRef?.nativeElement;
    if (!el) {
      return;
    }
    const margin = 8;
    const width = el.offsetWidth;
    const spaceOnRight = window.innerWidth - (triggerRect.right + 8) - margin;
    let left: number;
    if (spaceOnRight >= width) {
      /*
       * Fits to the right of the level-2 item, as normal.
       */
      left = triggerRect.right + 8;
    } else {
      /*
       * Not enough room on the right (this is exactly the edge
       * case in the screenshot) — flip it to open to the LEFT of
       * the level-2 popup instead.
       */
      left = Math.max(margin, triggerRect.left - width - 8);
    }
    this.childmenuPosition = { top: this.childmenuPosition.top, left };
  }
  // ==============================================================
  // AUTO-SCROLL — bring a partially-hidden trigger fully into view
  // ==============================================================
  private scrollIntoViewIfNeeded(target: HTMLElement): void {
    const barEl = target.closest('.app-hsidebar__scroll') as HTMLElement | null;
    if (!barEl) {
      return;
    }
    const rect = target.getBoundingClientRect();
    const barRect = barEl.getBoundingClientRect();
    const isFullyVisible =
      rect.left >= barRect.left &&
      rect.right <= barRect.right;
    if (isFullyVisible) {
      return;
    }
    this.isAutoScrolling = true;
    target.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
      block: 'nearest'
    });
  }
  // ==============================================================
  // BAR SCROLL
  // ==============================================================
  //
  // Fires for BOTH a real user swipe AND the programmatic
  // scrollIntoView() call above — window:scroll doesn't cover this
  // element at all, so this is the only hook for either case.
  //
  // Debounced to "settled" 120ms after the last scroll event, then
  // branches on whether WE caused it:
  //   - ours  -> reposition the open popup against the trigger's
  //              new on-screen location (don't close it)
  //   - user  -> the open popup's position is now stale relative to
  //              its trigger, so close it rather than show it
  //              floating in the wrong place
  //
  onBarScroll(): void {
    if (this.scrollSettleTimer) {
      clearTimeout(this.scrollSettleTimer);
    }
    this.scrollSettleTimer = setTimeout(() => {
      this.scrollSettleTimer = null;
      if (this.isAutoScrolling) {
        this.isAutoScrolling = false;
        if (this.openMenuTriggerEl && this.openMenu) {
          this.positionSubmenu(this.openMenuTriggerEl);
        }
        if (this.openSubmenuTriggerEl && this.openSubmenu) {
          this.positionChildmenu(this.openSubmenuTriggerEl);
        }
      } else {
        this.closeAll();
      }
    }, 120);
  }
  // ==============================================================
  // CLOSE ON OUTSIDE CLICK / TAP
  // ==============================================================
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target as Node)) {
      this.closeAll();
    }
  }
  // ==============================================================
  // CLOSE ON ESCAPE
  // ==============================================================
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeAll();
  }
  // ==============================================================
  // CLOSE ON RESIZE / PAGE SCROLL
  // ==============================================================
  @HostListener('window:resize')
  onResize(): void {
    this.closeAll();
  }
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.closeAll();
  }
  private closeAll(): void {
    this.cancelCloseTimer();
    this.openMenu = null;
    this.openSubmenu = null;
    this.openMenuTriggerEl = null;
    this.openSubmenuTriggerEl = null;
  }
}