
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpService } from '../../services/http.service';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-updateprofile',
//   standalone: true,
//   imports:[ReactiveFormsModule,RouterLink],
//   templateUrl: './updateprofile.component.html',
//   styleUrls: ['./updateprofile.component.scss']
// })
// export class UpdateprofileComponent implements OnInit {

//   user: any;
//   updateProfileForm: FormGroup;

//   constructor(
//     private httpService: HttpService,
//     private toastr: ToastrService,
//     private router: Router,
//     private fb: FormBuilder
//   ) { 
//     this.updateProfileForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       emailAddress: ['', [Validators.required, Validators.email]],
//       age: ['', Validators.required],
//       gender: ['', Validators.required],
//       phone: ['', Validators.required],
//       country: ['', Validators.required],
//       state: ['', Validators.required],
//       city: ['', Validators.required]
//     });
//   }

//   ngOnInit() {
//     this.loadUserProfile();
//   }

//   loadUserProfile() {
//     const token = localStorage.getItem('token');
//     if (token) {
//       this.httpService.getUserProfile(token).subscribe({
//         next: (response: any) => {
//           if(response.status) {
//             this.user = response.data[0];
//             this.updateProfileForm.patchValue({
//               firstName: this.user.user_first_name,
//               lastName: this.user.user_last_name,
//               emailAddress: this.user.user_email,
//               age: this.user.user_age,
//               gender: this.user.user_gender,
//               phone: this.user.user_phone,
//               country: this.user.user_country,
//               state: this.user.user_state,
//               city: this.user.user_city
//             });
//           } else {
//             this.toastr.error(response.message);
//             this.router.navigate(['/profile']);
//           }
//         },
//         error: (error) => {
//           this.toastr.error(error.error.message);
//           this.router.navigate(['/profile']);
//         }
//       });
//     } else {
//       this.router.navigate(['/login']);
//     }
//   }

//   onSubmit() {
//     if (this.updateProfileForm.invalid) {
//       this.toastr.error('Please fill out the form correctly.');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     if (token) {
//       const updatedData = this.updateProfileForm.value;
//       this.httpService.updateUserProfile(updatedData).subscribe({
//         next: (response: any) => {
//           if (response.status) {
//             this.toastr.success('Profile updated successfully.');
//             this.loadUserProfile(); // Reload the user profile to reflect the changes
//           } else {
//             this.toastr.error(response.message);
//           }
//         },
//         error: (error) => {
//           this.toastr.error(error.error.message);
//         }
//       });
//     } else {
//       this.router.navigate(['/login']);
//     }
//   }
// }



import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { cloneSVG } from '@ant-design/icons-angular';
import { InputBoxComponent } from "../../common/components/UI/form-elements/input-box/input-box.component";
import { SelectDropdownComponent } from '../../common/components/UI/form-elements/select-dropdown/select-dropdown.component';
import { ButtonComponent } from "../../common/components/UI/form-elements/button/button.component";

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputBoxComponent, SelectDropdownComponent, ButtonComponent],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.scss',
})
export class UpdateProfileComponent {
  userData: any;
  updateForm: any;
  countryList!: Array<any>;
  stateData!: Array<any>;
  cityData!: Array<any>;
  genderOptions = [{value:'male',display:'Male'},{value:'female',display:'Female'}];
 
  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private toster: ToastrService,
    private route: Router
  ) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userCountry: '',
      userState: '',
      userCity: '',
      userPhone: ['', Validators.required],
      userGender: ['', Validators.required],
      age: ['', Validators.required],
    });
    this.getUserData();
    this.fetchCountryData();
  }

  /**
   * Fetch logged in user data.
   * @returns {void}
   */
  getUserData(): void {
    const token = localStorage.getItem("token");
    this.httpService.getUserProfile(token).subscribe({
      next: (response: any) => {
        this.userData = response.data[0];
        this.UpdateForm()
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  UpdateForm(): void {
    this.updateForm.patchValue({
      userFirstName: this.userData.user_first_name,
      userLastName: this.userData.user_last_name,
      age: this.userData.user_age,
      userGender: this.userData.user_gender,
      userPhone: this.userData.user_phone,
      userCountry: this.userData.user_country,
      userState: this.userData.user_state,
      userCity: this.userData.user_city
    });

    this.changeCountryData();
    this.changeStateData();
  }

  /**
   * Fetch Country Names and Id's.
   * @returns {void}
   */
  fetchCountryData(): void {
    this.httpService.country().subscribe({
      next: (response: any) => {
        this.countryList = response.data[0];
        this.countryList =  this.countryList.map((obj:any) => {
          return {value:obj.country_name, display: obj.country_name}
        })
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  /**
   * Fetch State Names and Id's.
   * @returns {void}
   */
  changeCountryData(): void {
    
    const value: any = this.updateForm.get('userCountry');
    const data = {
      user_country: value?.value,
    };
    this.httpService.state(data)?.subscribe({
      next: (response: any) => {
        this.stateData = response.data[0];
        this.stateData =  this.stateData.map((obj:any) => {
          return {value:obj.state_name, display: obj.state_name}
        })
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  /**
   * Fetch City Names and Id's.
   * @returns {void}
   */
  changeStateData(): void {
    const value: any = this.updateForm.get('userState');
    if(!value?.value){
      this.cityData = []
      return
    }
    const data = {
      user_state: value?.value,
    };
    this.httpService.city(data)?.subscribe({
      next: (response: any) => {
        this.cityData = response.data[0];
        this.cityData =  this.cityData.map((obj:any) => {
          return {value:obj.city_name, display: obj.city_name}
        })
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onUpdate() {
    if (this.updateForm.valid) {
      const data = {
        user_first_name: this.updateForm.value.userFirstName,
        user_last_name: this.updateForm.value.userLastName,
        user_gender: this.updateForm.value.userGender,
        user_country: this.updateForm.value.userCountry,
        user_state: this.updateForm.value.userState,
        user_city: this.updateForm.value.userCity,
        user_age: this.updateForm.value.age,
        user_phone: this.updateForm.value.userPhone,
      };
      this.httpService.updateUserProfile(data).subscribe({
        next: (response: any) => {
          this.toster.success(response.message);
          this.route.navigateByUrl("/")
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}


