// import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PrivateComponent } from './private.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';

export const routes: Routes = [

    {
        path: '',
        component: PrivateComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'profile',
                component: MyprofileComponent
                
            },
            {
                path: 'updateprofile',
                component: UpdateprofileComponent
                
            },
            {
                path: 'changepassword',
                component: ChangePasswordComponent
                
            },
           
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

