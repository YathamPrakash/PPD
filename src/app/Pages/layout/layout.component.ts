import { Component } from '@angular/core';
import { VerticalSidebarComponent } from "../../Shared/components/vertical-sidebar/vertical-sidebar.component";
import { HeaderComponent } from '../../Shared/components/header/header.component';
import { HorizontalSidebarComponent } from "../../Shared/components/horizontal-sidebar/horizontal-sidebar.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [VerticalSidebarComponent, HeaderComponent,RouterOutlet, HorizontalSidebarComponent,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  sidebarWidth = 'w250';
  layoutMode:boolean=false;

  _doFetchToggleSidebar(event:string) {
    this.sidebarWidth =event
  }
  _doFetchLayoutMode(event: boolean) {
    this.layoutMode = event;
    if (this.layoutMode) {
      this.sidebarWidth = "w0"
    }
    else {
      this.sidebarWidth = "w250"
    }

  }
}
