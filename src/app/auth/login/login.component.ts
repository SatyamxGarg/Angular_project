
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { config } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
// import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

  userForm: any;
  isFormVisible: boolean = true;

  constructor(
    public formbuilder: FormBuilder,
    private httpService: HttpService,
    private toastr: ToastrService,
    private route: Router
  ) {
    this.userForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }
  ngOnInIt() {
  }

  onSubmit() {
    const data = {
      user_email: this.userForm.value.email,
      user_password: this.userForm.value.password
    };
    this.httpService.loginPost(data).subscribe({
      next: (response: any) => {
        if (!response.status) {
          this.toastr.error(response.message)
          return
        }
        localStorage.setItem("token", response.data.token)
        this.toastr.success("Logged In Successfully")
        this.route.navigate(['/profile']);
      },
      error: (error) => {
        this.toastr.error(error.error.message)
      },
    });
  }
}