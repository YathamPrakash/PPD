import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeHeaderComponent } from '../../../Shared/components/home-header/home-header.component';


interface LoginFeature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,HomeHeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isShowPassword = signal(false);
  activeTab = signal("1")
  constructor(private router: Router) { }


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

  authTabs = signal([
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


  _doLogin() {
    console.log("clicked")
    this.router.navigateByUrl('/layout')
  }


  pageContent = {
    logoText: 'StayNest',
    eyebrow: 'TRUSTED PG STAYS',
    title: 'A better way',
    highlightedTitle: 'to stay.',
    description:
      'Discover verified PGs, connect directly with property owners, and find a comfortable place that feels like home.',
    loginTitle: 'Welcome back',
    loginDescription: 'Sign in to continue to StayNest',
    emailLabel: 'Email address',
    emailPlaceholder: 'Enter your email address',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    loginButton: 'Sign In',
    dividerText: 'or',
    googleButton: 'Continue with Google',
    registerText: "Don't have an account?",
    registerLink: 'Create an account'
  };

  navigation = [
    {
      label: 'Find a PG',
      route: '/find-pg'
    },
    {
      label: 'List Your PG',
      route: '/list-pg'
    }
  ];

  features: LoginFeature[] = [
    {
      icon: '✓',
      title: 'Verified PG Listings',
      description: 'Only genuine and trusted properties'
    },
    {
      icon: '₹',
      title: 'No Brokerage',
      description: 'Connect directly with property owners'
    },
    {
      icon: '⌂',
      title: 'Easy Online Booking',
      description: 'Find and book your stay in minutes'
    }
  ];

  footerLinks = [
    {
      label: 'Privacy Policy',
      route: '/privacy-policy'
    },
    {
      label: 'Terms of Service',
      route: '/terms'
    },
    {
      label: 'Contact Us',
      route: '/contact'
    }
  ];

  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}