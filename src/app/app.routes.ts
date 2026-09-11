import { Routes } from '@angular/router';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { canDeactivateGuard } from './Guards/auth.guard';



export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "login",
        loadComponent:()=>import('./Pages/auth/login/login.component').then(m=>m.LoginComponent)
    },
    {
        path: "registration",
        canDeactivate: [canDeactivateGuard],
        loadComponent:()=>import('./Pages/auth/registration/registration.component').then(m=>m.RegistrationComponent)
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
    },
    {
        path:"pg-onboarding",
        loadComponent:()=>import('./Pages/PG/pg-onboarding/pg-onboarding.component').then(m=>m.PgOnboardingComponent)
    }

];
