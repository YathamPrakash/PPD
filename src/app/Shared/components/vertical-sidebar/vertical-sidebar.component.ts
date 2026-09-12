import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { AppMenusService } from '../../../Services/app-menus.service';
import { menuItem } from '../../models/data-model';


/**
 * How submenus are presented.
 *
 *  inline  - accordion, pushed down inside the sidebar
 *  flyout  - floating panel beside a collapsed icon rail
 */
type SubmenuMode = 'inline' | 'flyout';


@Component({
  selector: 'app-vertical-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vertical-sidebar.component.html',
  styleUrl: './vertical-sidebar.component.scss'
})
export class VerticalSidebarComponent implements OnInit {

  @Input() sidebarWidth = 'w250';

  @Input() mobileMenuOpen = false;

  /**
   * Must match the max-width used by respond(tablet) in mixins.scss.
   *
   * If the mixin is (max-width: 991px) leave this at 992. If it is
   * something else, change this to that value + 1. When the two
   * disagree there is a band of widths where CSS is in drawer mode
   * and TypeScript still thinks it is on desktop.
   */
  @Input() mobileBreakpoint = 992;

  /**
   * When true, opening a menu closes its siblings.
   * Left off by default so existing behaviour is unchanged.
   */
  @Input() accordion = false;

  @Output() toggleSidebar = new EventEmitter<string>();

  @Output() mobileMenuClosed = new EventEmitter<void>();

  menus: menuItem[] = [];

  /** Recomputed on resize, so the template never has to guess. */
  isMobileView = false;

  constructor(
    private menuservice: AppMenusService
  ) {
    this.menus = this.menuservice.menuItems;
  }


  ngOnInit(): void {
    this.isMobileView = this.detectMobile();
  }


  // ==============================================================
  // MODE
  // ==============================================================

  /**
   * The single decision point. Everything else reads from this
   * instead of testing sidebarWidth in the template.
   *
   * Mobile is always inline. The collapsed icon rail only exists
   * on desktop, so a flyout can never be correct on a phone.
   */
  get submenuMode(): SubmenuMode {

    if (this.isMobileView) {
      return 'inline';
    }

    if (this.sidebarWidth === 'w80') {
      return 'flyout';
    }

    return 'inline';
  }


  get isFlyout(): boolean {
    return this.submenuMode === 'flyout';
  }


  get isInline(): boolean {
    return this.submenuMode === 'inline';
  }


  // ==============================================================
  // VISIBILITY
  // ==============================================================

  hasChildren(item: menuItem): boolean {
    return !!item.children?.length;
  }


  /**
   * Drives *ngIf on every submenu list, at all three levels.
   * One method, one answer, no CSS involved.
   */
  isSubmenuOpen(item: menuItem): boolean {

    if (!this.hasChildren(item)) {
      return false;
    }

    return !!item.open;
  }


  // ==============================================================
  // CLICK
  // ==============================================================

  /**
   * Same name and same first argument as before, so nothing that
   * already calls this needs to change.
   */
  toggleMenu(item: menuItem, event?: Event): void {

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    /*
     * Existing navigation behaviour, unchanged.
     */
    this.menuservice._doNavigate(item);

    /*
     * Branch item: open or close it.
     *
     * In flyout mode hover already controls this, so a click
     * must not toggle it shut again.
     */
    if (this.hasChildren(item)) {

      if (this.isInline) {
        this.openOrClose(item);
      }

      return;
    }

    /*
     * Leaf item: tidy up before the route changes.
     */
    this.closeAllMenus();

    if (this.isMobileView) {
      this.closeMobileMenu();
    }
  }


  private openOrClose(item: menuItem): void {

    const willOpen = !item.open;

    if (willOpen && this.accordion) {
      this.closeSiblings(item);
    }

    item.open = willOpen;

    /*
     * Collapsing a branch collapses everything beneath it,
     * otherwise a level 3 list reappears already open the
     * next time its parent is expanded.
     */
    if (!willOpen) {
      this.closeDescendants(item);
    }
  }


  private closeSiblings(target: menuItem): void {

    const siblings = this.findSiblings(target, this.menus);

    for (const sibling of siblings) {

      if (sibling === target) {
        continue;
      }

      sibling.open = false;
      this.closeDescendants(sibling);
    }
  }


  private findSiblings(
    target: menuItem,
    list: menuItem[]
  ): menuItem[] {

    if (list.includes(target)) {
      return list;
    }

    for (const item of list) {

      if (!item.children?.length) {
        continue;
      }

      const found = this.findSiblings(target, item.children);

      if (found.length) {
        return found;
      }
    }

    return [];
  }


  // ==============================================================
  // HOVER  (desktop collapsed rail only)
  // ==============================================================

  onItemEnter(item: menuItem): void {

    if (!this.isFlyout || !this.hasChildren(item)) {
      return;
    }

    item.open = true;
  }


  onItemLeave(item: menuItem): void {

    if (!this.isFlyout || !this.hasChildren(item)) {
      return;
    }

    item.open = false;
    this.closeDescendants(item);
  }


  // ==============================================================
  // RESET
  // ==============================================================

  private closeDescendants(item: menuItem): void {

    if (!item.children?.length) {
      return;
    }

    for (const child of item.children) {
      child.open = false;
      this.closeDescendants(child);
    }
  }


  private closeAllMenus(list: menuItem[] = this.menus): void {

    for (const item of list) {

      item.open = false;

      if (item.children?.length) {
        this.closeAllMenus(item.children);
      }
    }
  }


  // ==============================================================
  // SIDEBAR TOGGLE
  // ==============================================================

  _doToggleSidebar(): void {

    if (this.isMobileView) {
      return;
    }

    this.sidebarWidth =
      this.sidebarWidth === 'w250'
        ? 'w80'
        : 'w250';

    /*
     * Switching between rail and full width switches the submenu
     * mode with it. Anything left open belongs to the old mode.
     */
    this.closeAllMenus();

    this.toggleSidebar.emit(
      this.sidebarWidth
    );
  }


  // ==============================================================
  // MOBILE DRAWER
  // ==============================================================

  closeMobileMenu(): void {
    this.mobileMenuClosed.emit();
  }


  private detectMobile(): boolean {
    return window.innerWidth < this.mobileBreakpoint;
  }


  /** Kept for anything outside this component that still calls it. */
  private isMobile(): boolean {
    return this.isMobileView;
  }


  // ==============================================================
  // ESCAPE KEY
  // ==============================================================

  @HostListener('document:keydown.escape')
  onEscape(): void {

    if (this.isMobileView && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }


  // ==============================================================
  // WINDOW RESIZE
  // ==============================================================

  @HostListener('window:resize')
  onWindowResize(): void {

    const wasMobile = this.isMobileView;

    this.isMobileView = this.detectMobile();

    /*
     * Crossing the breakpoint swaps inline and flyout. State from
     * the previous mode would otherwise leave a flyout stranded
     * open in the drawer, or vice versa.
     */
    if (wasMobile !== this.isMobileView) {
      this.closeAllMenus();
    }
  }
}