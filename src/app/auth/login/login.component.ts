
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { config } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  userForm: any;
  isFormVisible: boolean = true;

  constructor(
    public formbuilder: FormBuilder,
    private httpService: HttpService,
    private toastr: ToastrService
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
      },
      error: (error) => {
        this.toastr.error(error.error.message)
      },
    });
  }
}