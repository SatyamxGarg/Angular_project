import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

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
   country(){
    return this.http.get("http://localhost/Angular_crud/em_be/api/v1/country/"); 
   }
   state(body:any){
    return this.http.post("http://localhost/Angular_crud/em_be/api/v1/state/",body); 
   }
   city(body:any){
    return this.http.post("http://localhost/Angular_crud/em_be/api/v1/city/",body); 
   }
   getAllUsers(body:any){
    return this.http.get("http://localhost/Angular_crud/em_be/api/v1/users/",body); 

   }
   getEditUser(body:any){
    return this.http.post("http://localhost/Angular_crud/em_be/api/v1/edit-data/",body); 

   }
   getAllProjects(body:any){
    return this.http.post("http://localhost/Angular_crud/em_be/api/v1/list-projects/",body); 
   }
   addProject(body:any){
    return this.http.post("http://localhost/Angular_crud/em_be/api/v1/add-projects/",body); 
   }
   dltProject(projectId: string) {
    let params = new HttpParams().set('project_id', projectId);
    return this.http.delete("http://localhost/Angular_crud/em_be/api/v1/del-projects/", { params });
  }
  getProjectDetails(body:any,projectId: string){
    let params = new HttpParams().set('project_id', projectId);
    return this.http.get("http://localhost/Angular_crud/em_be/api/v1/get-project/", { params });
  }
  updateProject(projectId: string, body: any) {
    let params = new HttpParams().set('project_id', projectId);
    return this.http.put("http://localhost/Angular_crud/em_be/api/v1/update-project/", body, { params });
}
}

