import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';

interface UserProfile{
  firstName: string;
  lastName: string;
  userRole: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userProfile=new BehaviorSubject<UserProfile>({
    firstName: '',
    lastName: '',
    userRole: '',
  });
  userProfileObservable=this.userProfile.asObservable();
  
   constructor(private httpService: HttpService) { }
   
   userProfileData(){
    const token=localStorage.getItem("token");
    return this.httpService.getUserProfile(token);
   }

   setProfile(userProfile: UserProfile){
    this.userProfile.next({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      userRole: userProfile.userRole,
    });
   }
}
