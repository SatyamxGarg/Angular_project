
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { InputBoxComponent } from '../../common/components/UI/form-elements/input-box/input-box.component';
import { ButtonComponent } from '../../common/components/UI/form-elements/button/button.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule,InputBoxComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  loader: boolean=false;

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
  ngOnInit() {
  }

  onSubmit() {

    // if(this.loader) return
    if (this.loader || this.userForm.invalid) {
      this.toastr.error('Please enter correct details.');
      return;
    }
    

    this.loader = true;

    const data = {
      user_email: this.userForm.value.email,
      user_password: this.userForm.value.password
    };
    this.httpService.loginPost(data).subscribe({
      next: (response: any) => {
        this.loader = false;
        if (!response.status) {
          this.toastr.error(response.message)
          return
        }
        localStorage.setItem("token", response.data.token)
        this.toastr.success("Logged In Successfully")
        this.route.navigate(['/profile']);
      },
      error: (error) => {
        this.loader = false;
        this.toastr.error(error.error.message);
      },
    });
  }
}