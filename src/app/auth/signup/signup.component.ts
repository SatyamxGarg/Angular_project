import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { config } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { InputBoxComponent } from '../../common/components/UI/form-elements/input-box/input-box.component';
import { ButtonComponent } from '../../common/components/UI/form-elements/button/button.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule,InputBoxComponent,ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  loader: boolean=false;

  SignUpOptions = [
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

    if(this.loader) return
    if (this.signupForm.invalid) {
      this.toastr.error('Please enter correct details.');
      return;
    }
    

    this.loader = true;

    const data = {
      user_first_name: this.signupForm.value.fname,
      user_last_name: this.signupForm.value.lname,
      user_email: this.signupForm.value.email,
      user_password: this.signupForm.value.password
    };
    this.httpService.signupPost(data).subscribe({
      next: (response: any) => {
        this.loader = false;
        if (!response.status) {
          this.toastr.error(response.message)
          return
        }
        localStorage.setItem("token", response.data.token)
        this.toastr.success("Signed Up Successfully")
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loader = false;
        this.toastr.error(error.error.message)
        // console.log(error);
      },
    });
  }
}