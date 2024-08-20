import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user!: Array<any>;

  // constructor
  // constructor(private iconService: IconService) {
  //   this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  // }

  constructor(
    private httpService: HttpService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    const token = localStorage.getItem('token');
    if (token) {
      this.httpService.getAllUsers(token).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.user = response.data[0];
            console.log(this.user);
          } else {
            this.toastr.error(response.message);
            this.router.navigate(['/profile']);
          }
        },
        error: (error) => {
          this.toastr.error(error.error.message);
          this.router.navigate(['/profile']);
        }
      });

    }
    else {
      this.router.navigate(['/login']);
    }
  }

  editFunc(){
    this.router.navigate(['/profile/update-profile']);
  }
  delFunc(){
    
  }

}
