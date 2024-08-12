// import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import {AuthChangePasswordComponent} from './auth-change-password/auth-change-password.component';

export const routes: Routes = [

    {
        path:'login',
        component: LoginComponent
    },

   {
        path:'signup',
        component: SignupComponent
    },

    // {
    //      path:'auth-change-password',
    //     component: AuthChangePasswordComponent
    // },

    {
        path:'**',
        redirectTo: 'login'
    }
];

