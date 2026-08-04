import { Routes } from '@angular/router';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "login",
        loadComponent:()=>import('./Pages/login/login.component').then(m=>m.LoginComponent)
    },
    {
        path: "registration",
        loadComponent:()=>import('./Pages/registration/registration.component').then(m=>m.RegistrationComponent)
    },
    {
        path:"home",
        loadComponent:()=>import('./Pages/home/home.component').then(m=>m.HomeComponent)
    },
    {
        path: "layout",
        component: LayoutComponent,
        children: [
            {
                path: "",
                redirectTo: "dashboard",
                pathMatch: "full"
            },
            {
                path:"dashboard",
                component:DashboardComponent
            },
            {
                path:"tenantlist",
                loadComponent:()=>import('../app/Pages/tenant-management/tenant-management.component').then(m=>m.TenantManagementComponent)
            }
        ]
    }
];
