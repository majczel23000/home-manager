import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';

export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [LoggedInGuard],
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('./views/dashboard/dashboard.component').then(mod => mod.DashboardComponent),
    },
    {
        path: 'shopping',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./views/shopping/shopping-list/shopping-list.component').then(mod => mod.ShoppingListComponent),
            },
        ]
    },
    {
        path: 'loans',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./views/loans/loans-dashboard/loans-dashboard.component').then(mod => mod.LoansDashboardComponent),
            },
            {
                path: ':id',
                loadComponent: () => import('./views/loans/loan-details/loan-details.component').then(mod => mod.LoanDetailsComponent),
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
