import { Routes } from '@angular/router';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';

export const routes: Routes = [
    {
        path: 'myprofile',
        loadChildren: () => import("./pages/pages.routes").then(m => m.routes),
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
