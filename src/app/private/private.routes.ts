// import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PrivateComponent } from './private.component';
import { MyprofileComponent } from './my-profile/myprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/changepassword.component';
import { UpdateProfileComponent } from './update-profile/updateprofile.component';

export const routes: Routes = [

    {
        path: '',
        component: PrivateComponent,
        children: [
            {
                path: '',
                component: MyprofileComponent
            },
            
            {
                path: 'update-profile',
                component: UpdateProfileComponent
                
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent
                
            },
           
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

