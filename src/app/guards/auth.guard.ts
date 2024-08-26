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
          user_first_name: response?.data[0].user_first_name || '',
          user_last_name: response?.data[0].user_last_name|| '',
          user_role_id: response?.data[0].user_role_id || '',
        });
      },
    });
    return true;
  }
    router.navigate(['/login']);
    return false; 
  
};