import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const profileToken=localStorage.getItem("token");

  if (profileToken) {
    const userService = inject(UserService);
    userService.userProfileData().subscribe({
      next:(response: any)=>{
        userService.setProfile({
          firstName: response?.data[0].userFirstName || '',
          lastName: response?.data[0].userLastName || '',
          userRole: response?.data[0].userRoleName || '',
        });
      },
    });
    return true;
  }
    router.navigate(['/login']);
    return false; 
  
};