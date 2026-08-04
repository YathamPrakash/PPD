import { Component,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isShowPassword=signal(false);  
  activeTab=signal("1")
  constructor(private router:Router){}


  //old implementation with array and update array element
  //===================================================
  // authTabs :any= [
  //   {
  //     tabTitle: "Login",
  //     tabId: "1",
  //     tabstyle: "active",
  //   },
  //   // {
  //   //   tabTitle: "Sign up",
  //   //   tabId: "2",
  //   //   tabstyle: "",
  //   // }
  // ]

  // _doSelectAuthTab(tab: any,i: string | number){
  //   this.authTabs.forEach((tab:any)=>tab.tabstyle="")
  //   this.authTabs[i].tabstyle="active"
  // }
//=================================================


//New Implemenattaion with signals and update signal value
//==========================================================

authTabs=signal([
  {
    tabTitle: "Login",
    tabId: "1",
    tabstyle: "active",
  },
  {
    tabTitle: "Sign up",
    tabId: "2",
    tabstyle: "",
  }
])


  _doSelectAuthTab(tab: any, i: string | number) {
    this.activeTab.set(tab.tabId)
  }


  _doLogin(){
    console.log("clicked")
    this.router.navigateByUrl('/layout')
  }

  _doTogglePasswordType(){
    this.isShowPassword.update(passtypestate=>!passtypestate)
  }

}
