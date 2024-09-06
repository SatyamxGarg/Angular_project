import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = "http://localhost:8081/api/v1"

  constructor(private http: HttpClient) {

   }
   loginPost(body:any){
   // return this.http.post("http://localhost/Angular_crud/em_be/api/v1/auth/login/",body);
   return this.http.post(this.baseUrl+"/auth/login/",body);
   }

   signupPost(body:any){
    // return this.http.post("http://localhost/Angular_crud/em_be/api/v1/auth/signup/",body);
    return this.http.post(this.baseUrl+"/auth/signup/",body);

   }
   getUserProfile(body:any){
    // return this.http.get("http://localhost/Angular_crud/em_be/api/v1/myprofile/",body);   
    return this.http.get(this.baseUrl+"/user/",body);
 
   }
   updateUserProfile(body:any){
    // return this.http.put("http://localhost/Angular_crud/em_be/api/v1/edit-users/",body); 
    return this.http.put(this.baseUrl+"/user/",body);

   }
   changePassword(body:any){
    // return this.http.put("http://localhost/Angular_crud/em_be/api/v1/changepassword/",body); 
    return this.http.put(this.baseUrl+"/user/change-password",body);

   }
   country(){
    // return this.http.get("http://localhost/Angular_crud/em_be/api/v1/country/"); 
    return this.http.get(this.baseUrl+"/user/get-country");

   }
   state(body:any){
    // return this.http.post("http://localhost/Angular_crud/em_be/api/v1/state/",body); 
    return this.http.post(this.baseUrl+"/user/get-state",body);

   }
   city(body:any){
    // return this.http.post("http://localhost/Angular_crud/em_be/api/v1/city/",body); 
    return this.http.post(this.baseUrl+"/user/get-city",body);
   }
   getAllUsers(body:any){
    return this.http.get("http://localhost/Angular_crud/em_be/api/v1/users/",body); 

   }
   getEditUser(body:any){
    return this.http.post("http://localhost/Angular_crud/em_be/api/v1/edit-data/",body); 

   }
   getAllProjects(body:any){
    // return this.http.post("http://localhost/Angular_crud/em_be/api/v1/list-projects/",body); 
    return this.http.get(this.baseUrl+"/project/",body);
   }
   addProject(body:any){
    // return this.http.post("http://localhost/Angular_crud/em_be/api/v1/add-projects/",body); 
    return this.http.post(this.baseUrl+"/project/",body);
   }
  //  dltProject(projectId: string) {
  //   let params = new HttpParams().set('projectId', projectId);
  //   // return this.http.delete("http://localhost/Angular_crud/em_be/api/v1/del-projects/", { params });
  // }

  dltProject(projectId: string) {
    return this.http.delete(`${this.baseUrl}/project/${projectId}`);
  }


  getProjectDetails(body:any,projectId: string){
    // let params = new HttpParams().set('project_id', projectId);
    // return this.http.get("http://localhost/Angular_crud/em_be/api/v1/get-project/", { params });
    return this.http.get(`${this.baseUrl}/project/${projectId}`,body);

  }
  updateProject(projectId: string, body: any) {
    // let params = new HttpParams().set('project_id', projectId);
    // return this.http.put("http://localhost/Angular_crud/em_be/api/v1/update-project/", body, { params });
    return this.http.put(`${this.baseUrl}/project/${projectId}`,body);

}
}

