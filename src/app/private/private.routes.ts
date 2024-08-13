// import { Component } from '@angular/core';
import { Routes } from '@angular/router';
// import { MyprofileComponent } from './myprofile/myprofile.component';
// import { AdminComponent } from './layouts/admin-layout/admin-layout.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { PrivateComponent } from './private.component';

export const routes: Routes = [

    // {
    //     path:'myprofile',
    //     component: MyprofileComponent
    // },

    // {
    //     path:'dashboard',
    //     component: DashboardComponent
    // },

    {
         path: '',
         component: PrivateComponent,
        //  children:[
        //     {
        //         path:'',
        //         component: Component
        //     }
        //  ]
    },

    {
        path:'**',
        redirectTo: ''
    }
];

