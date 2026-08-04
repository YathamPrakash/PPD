import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() sidebarWidth: string = 'w250';
  @Output() toggleSidebar = new EventEmitter<string>();
  menus: menuItem[] = [];

  constructor(private menuservice: AppMenusService) {
    this.menus = this.menuservice.menuItems;
  }


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


  toggleMenu(item:menuItem) {
    this.menuservice._doNavigate(item)
    if (item.children)
      item.open = !item.open;
  }

  _doToggleSidebar() {
    this.sidebarWidth = this.sidebarWidth == 'w250' ? 'w80' : 'w250'
    this.toggleSidebar.emit(this.sidebarWidth)
  }
}
