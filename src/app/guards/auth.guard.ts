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
          user_first_name: response?.data.user.userFirstName || '',
          user_last_name: response?.data.user.userLastName|| '',
          user_role_id: response?.data.user.userRoleId || '',
        });
      },
    });
    return true;
  }
    router.navigate(['/login']);
    return false; 
  
};