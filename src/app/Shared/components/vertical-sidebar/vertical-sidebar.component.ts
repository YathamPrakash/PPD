import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

import { AppMenusService } from '../../../Services/app-menus.service';
import { menuItem } from '../../models/data-model';

@Component({
  selector: 'app-vertical-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vertical-sidebar.component.html',
  styleUrl: './vertical-sidebar.component.scss'
})
export class VerticalSidebarComponent {

  @Input() sidebarWidth = 'w250';

  @Input() mobileMenuOpen = false;

  @Output() toggleSidebar = new EventEmitter<string>();

  @Output() mobileMenuClosed = new EventEmitter<void>();

  menus: menuItem[] = [];

  constructor(
    private menuservice: AppMenusService
  ) {
    this.menus = this.menuservice.menuItems;
  }


  // ==============================================================
  // MENU
  // ==============================================================

  toggleMenu(item: menuItem): void {

    /*
     * Keep your existing navigation behavior.
     */
    this.menuservice._doNavigate(item);

    /*
     * If the item has children, open/close
     * its submenu.
     */
    if (item.children?.length) {
      item.open = !item.open;
    }

    /*
     * On mobile, close the drawer after
     * selecting a leaf menu item.
     */
    if (
      this.isMobile() &&
      !item.children?.length
    ) {
      this.closeMobileMenu();
    }
  }


  hasChildren(item: menuItem): boolean {
    return !!item.children?.length;
  }


  // ==============================================================
  // SIDEBAR TOGGLE
  // ==============================================================

  _doToggleSidebar(): void {

    /*
     * On mobile we use the drawer instead of
     * the desktop collapsed state.
     */
    if (this.isMobile()) {
      return;
    }

    this.sidebarWidth =
      this.sidebarWidth === 'w250'
        ? 'w80'
        : 'w250';

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


  private isMobile(): boolean {
    return window.innerWidth < 768;
  }


  // ==============================================================
  // ESCAPE KEY
  // ==============================================================

  @HostListener('document:keydown.escape')
  onEscape(): void {

    if (
      this.isMobile() &&
      this.mobileMenuOpen
    ) {
      this.closeMobileMenu();
    }
  }


  // ==============================================================
  // WINDOW RESIZE
  // ==============================================================

  @HostListener('window:resize')
  onWindowResize(): void {

    /*
     * Nothing needs to be calculated here.
     *
     * Popup positioning is handled entirely
     * by CSS.
     */
  }
}