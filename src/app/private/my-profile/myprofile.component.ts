import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.scss'
})
export class MyprofileComponent implements OnInit {

  user: any;

  constructor(
    private httpService: HttpService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const token = localStorage.getItem('token');
    if (token) {
      this.httpService.getUserProfile(token).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.user = response.data.data;
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
    } else {
      this.router.navigate(['/login']);
    }
  }
}
