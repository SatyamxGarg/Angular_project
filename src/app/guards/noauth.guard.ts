import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';


export const noauthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  if (localStorage.getItem("token")) {
       router.navigate(['/profile']);
    return false;
  }
  else {
    return true; 
  }
};