import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output,} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 @Input() sidebarWidth: string = '250px';
 @Input() layoutMode: boolean = true;
 @Output() toggleLayout= new EventEmitter<boolean>();
  constructor(private router:Router){}

  ngDoCheck(){
    console.log(this.sidebarWidth,"sidebarWidth")
  }

  _doToggleLayout(event:Event){
    console.log(this.layoutMode,"layoutmode");
    this.toggleLayout.emit(this.layoutMode)
  }
  _doLogout(){
    this.router.navigateByUrl('/login')
  }
}
