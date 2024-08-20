import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { cloneSVG } from '@ant-design/icons-angular';

@Component({
  selector: 'app-edit-users',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
 templateUrl: './edit-users.component.html',
  styleUrl: './edit-users.component.scss'
})
export class EditUsersComponent {
  userData: any;
  updateForm: any;
  countryList!: Array<any>;
  stateData!: Array<any>;
  cityData!: Array<any>;
  genderOptions: string[] = ['male', 'female'];
  paramId:any;
  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private toster: ToastrService,
    private activatedRoute: ActivatedRoute,
    private route:Router
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
    this.paramId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUserData(this.paramId);
    this.fetchCountryData();
  }

  /**
   * Fetch logged in user data.
   * @returns {void}
   */
  getUserData(paramId:any): void {
    this.httpService.getEditUser(paramId).subscribe({
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


