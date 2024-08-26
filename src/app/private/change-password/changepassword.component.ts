import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../services/http.service'; 
import { InputBoxComponent } from '../../common/components/UI/form-elements/input-box/input-box.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../common/components/UI/form-elements/button/button.component';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule,InputBoxComponent,FormsModule,ButtonComponent],
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: any;
  loader : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private toastr: ToastrService,
    private router: Router
  ) { 
   
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
    
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  passwordMatchValidator(form: any) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if(confirmPassword){
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }
  }

  onSubmit() {

     if (this.loader || this.passwordForm.invalid) {
      this.toastr.error('Please enter correct password.');
      // provideToastr({preventDuplicates:true});
      return;
    }

    
    this.loader = true;
    const data = {
      currentPassword: this.passwordForm.value.currentPassword,
      newPassword: this.passwordForm.value.newPassword
    };

    this.httpService.changePassword(data).subscribe({
      next: (response: any) => {
        this.loader = false;
        if (!response.status) {
          this.toastr.error(response.message);
          return;
        }
        this.toastr.success('Password changed successfully');
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.toastr.error(error.error.message);
        this.loader = false;
      }
    });
  }
}
