import { Routes } from '@angular/router';
// import { MyprofileComponent } from './privates/myprofile/myprofile.component';
import { authGuard } from './guards/auth.guard';
import { noauthGuard } from './guards/noauth.guard';

export const routes: Routes = [
    {
        path: 'profile',
        canActivate: [authGuard],
        loadChildren: () => import("./private/private.routes").then(m => m.routes),
        
    },
    
    {
        path: '',
        canActivate: [noauthGuard],
        loadChildren: () => import("./auth/auth.routes").then(m => m.routes),
    },
  
    {
        path: '**',
        redirectTo: ''
    }
];
