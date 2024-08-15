
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-updateprofile',
  standalone: true,
  imports:[ReactiveFormsModule,RouterLink],
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss']
})
export class UpdateprofileComponent implements OnInit {

  user: any;
  updateProfileForm: FormGroup;

  constructor(
    private httpService: HttpService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.updateProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const token = localStorage.getItem('token');
    if (token) {
      this.httpService.getUserProfile(token).subscribe({
        next: (response: any) => {
          if(response.status) {
            this.user = response.data[0];
            this.updateProfileForm.patchValue({
              firstName: this.user.user_first_name,
              lastName: this.user.user_last_name,
              emailAddress: this.user.user_email,
              age: this.user.user_age,
              gender: this.user.user_gender,
              phone: this.user.user_phone,
              country: this.user.user_country,
              state: this.user.user_state,
              city: this.user.user_city
            });
          } else {
            this.toastr.error(response.message);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.toastr.error(error.error.message);
          this.router.navigate(['/dashboard']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
 
  onSubmit() {
    if (this.updateProfileForm.invalid) {
      this.toastr.error('Please fill out the form correctly.');
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      const updatedData = this.updateProfileForm.value;
      this.httpService.updateUserProfile(updatedData).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.toastr.success('Profile updated successfully.');
            this.loadUserProfile(); // Reload the user profile to reflect the changes
          } else {
            this.toastr.error(response.message);
          }
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
