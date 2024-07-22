import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/users'
    },
    {
        path: 'users',
        component: UserComponent
    },
    {
        path: 'users/page/:page',
        component: UserComponent
    },
    {
        path: 'users/create',
        component: FormUserComponent,
        canActivate: [authGuard]

    },
    {
        path: 'users/edit/:id',
        component: FormUserComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: AuthComponent
    }
];
