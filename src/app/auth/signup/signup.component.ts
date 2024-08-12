import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { config } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: any;
  isFormVisible: boolean = true;

  constructor(
    public formbuilder: FormBuilder,
    private httpService: HttpService,
    private toastr: ToastrService,
    private router: Router
  ) 
  {
    this.signupForm = this.formbuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  ngOnInIt() {
  }

  onSignup() {
    const data = {
      user_first_name: this.signupForm.value.fname,
      user_last_name: this.signupForm.value.lname,
      user_email: this.signupForm.value.email,
      user_password: this.signupForm.value.password
    };
    this.httpService.signupPost(data).subscribe({
      next: (response: any) => {
        if (!response.status) {
          this.toastr.error(response.message)
          return
        }
        localStorage.setItem("token", response.data.token)
        this.toastr.success("Signed Up Successfully")
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error(error.error.message)
        // console.log(error);
      },
    });
  }
}