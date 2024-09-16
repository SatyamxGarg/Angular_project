import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = " http://127.0.0.1:3000"
   // http://localhost:8081/api/v1

  constructor(private http: HttpClient) {

   }
   loginPost(body:any){
  //  return this.http.post(this.baseUrl+"/auth/login/",body);
  return this.http.post(`${this.baseUrl}/signin`, body);
   }

   signupPost(body:any){
    // return this.http.post(this.baseUrl+"/auth/signup/",body);
    return this.http.post(`${this.baseUrl}/signup`, body);
   }

   getUserProfile(body:any){
    // return this.http.get(this.baseUrl+"/user/",body);
    return this.http.get(`${this.baseUrl}/user-details`, body);
   }
   updateUserProfile(body:any){
    // return this.http.put(this.baseUrl+"/user/",body);
    return this.http.patch(`${this.baseUrl}/user-details/update`, body);
   }
   changePassword(body:any){
    // return this.http.put(this.baseUrl+"/user/change-password",body);
    return this.http.patch(`${this.baseUrl}/change-password`, body);
   }
   country(){
    // return this.http.get(this.baseUrl+"/user/get-country");
    return this.http.get(`${this.baseUrl}/countries`);
   }
   state(body:any){
    // return this.http.post(this.baseUrl+"/user/get-state",body);
    return this.http.post(`${this.baseUrl}/states`,body);
   }
   city(body:any){
    // return this.http.post(this.baseUrl+"/user/get-city",body);
    return this.http.post(`${this.baseUrl}/cities`,body);
   }
   
   getAllProjects(body:any){
    // return this.http.get(this.baseUrl+"/project/",body);
    return this.http.get(`${this.baseUrl}/projects`,body);
   }
   addProject(body:any){
    // return this.http.post(this.baseUrl+"/project/",body);
    return this.http.post(`${this.baseUrl}/projects/add`,body);
   }
   getAllUsers(body:any){
    return this.http.get("http://localhost/Angular_crud/em_be/api/v1/users/",body); 

   }
   getEditUser(body:any){
    return this.http.post("http://localhost/Angular_crud/em_be/api/v1/edit-data/",body); 

   }

  dltProject(projectId: string) {
    // return this.http.delete(`${this.baseUrl}/project/${projectId}`);
    return this.http.delete(`${this.baseUrl}/projects/${projectId}`);
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

