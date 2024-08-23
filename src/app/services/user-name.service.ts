// import { Injectable } from '@angular/core';
// import { HttpService } from './http.service';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserNameService {
//   name = new BehaviorSubject<any>({});
//   loggedUserName = this.name.asObservable();
//   constructor(private httpService: HttpService) {
//   }
//   userData() {
//     const token=localStorage.getItem("token");
//     this.httpService.getUserProfile(token).subscribe({
//       next: (response: any) => {
//         this.name.next(response?.data[0].user_first_name);
//         console.log(this.name);
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }
// }