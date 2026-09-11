import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input()
  sidebarWidth = 'w250';


  @Input()
  layoutMode = false;


  @Output()
  toggleLayout = new EventEmitter<boolean>();


  @Output()
  mobileMenuToggle = new EventEmitter<void>();


  constructor(
    private router: Router
  ) {}


  _doToggleLayout(event: Event): void {

    this.toggleLayout.emit(this.layoutMode);

  }


  _doToggleMobileMenu(): void {

    this.mobileMenuToggle.emit();

  }


  _doLogout(): void {

    this.router.navigateByUrl('/login');

  }

}