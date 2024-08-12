import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MyprofileComponent } from './myprofile/myprofile.component';

export const routes: Routes = [

    {
        path:'myprofile',
        component: MyprofileComponent
    },
    {
        path:'**',
        redirectTo: 'login'
    }
];

