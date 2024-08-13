import { Routes } from '@angular/router';
import { MyprofileComponent } from './private/myprofile/myprofile.component';
export const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import("./private/private.routes").then(m => m.routes),
    },
    
    {
        path: '',
        loadChildren: () => import("./auth/auth.routes").then(m => m.routes),
    },
  
    {
        path: '**',
        redirectTo: ''
    }
];
