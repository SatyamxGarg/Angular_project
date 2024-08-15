import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {

   }
   loginPost(body:any){
    return this.http.post("http://localhost/Angular_crud/em_be/api/v1/auth/login/",body);
   }

   signupPost(body:any){
    return this.http.post("http://localhost/Angular_crud/em_be/api/v1/auth/signup/",body);
   }
   getUserProfile(body:any){
    return this.http.get("http://localhost/Angular_crud/em_be/api/v1/myprofile/",body);    
   }
   updateUserProfile(body:any){
    return this.http.put("http://localhost/Angular_crud/em_be/api/v1/edit-users/",body); 
   }
   changePassword(body:any){
    return this.http.put("http://localhost/Angular_crud/em_be/api/v1/changepassword/",body); 
   }
}

