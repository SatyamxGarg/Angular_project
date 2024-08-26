import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';

interface UserProfile{
  user_first_name: string;
  user_last_name: string;
  user_role_id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userProfile=new BehaviorSubject<UserProfile>({
    user_first_name: '',
    user_last_name: '',
    user_role_id: '',
  });
  userProfileObservable=this.userProfile.asObservable();
  
   constructor(private httpService: HttpService) { }
   
   userProfileData(){
    const token=localStorage.getItem("token");
    return this.httpService.getUserProfile(token);
   }

   setProfile(userProfile: UserProfile){
    this.userProfile.next({
      user_first_name: userProfile.user_first_name,
      user_last_name: userProfile.user_last_name,
      user_role_id: userProfile?.user_role_id || this.userProfile.value.user_role_id,
    });
   }
}
