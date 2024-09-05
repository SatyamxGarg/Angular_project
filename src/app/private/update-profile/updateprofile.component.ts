import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { cloneSVG } from '@ant-design/icons-angular';
import { InputBoxComponent } from "../../common/components/UI/form-elements/input-box/input-box.component";
import { SelectDropdownComponent } from '../../common/components/UI/form-elements/select-dropdown/select-dropdown.component';
import { ButtonComponent } from "../../common/components/UI/form-elements/button/button.component";
import { UserService } from '../../services/user.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputBoxComponent, SelectDropdownComponent, ButtonComponent, FormsModule,MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.scss',
})
export class UpdateProfileComponent {
  loading: boolean = true;
  userData: any;
  updateForm: any;
  countryList!: Array<any>;
  stateData!: Array<any>;
  cityData!: Array<any>;
  genderOptions = [{value:'MALE',display:'Male'},{value:'FEMALE',display:'Female'}];
  loader: boolean = false;
  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private toster: ToastrService,
    private route: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userCountry: ['', Validators.required],
      userState: ['', Validators.required],
      userCity: ['', Validators.required],
      userPhone: ['', [ Validators.required,Validators.pattern('^[0-9]{10}$')]],
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
        this.userData = response.data;
        this.UpdateForm()
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  UpdateForm(): void {
    this.updateForm.patchValue({
      userFirstName: this.userData.user.userFirstName,
      userLastName: this.userData.user.userLastName,
      age: this.userData.user.userAge,
      userGender: this.userData.user.userGender,
      userPhone: this.userData.user.userPhone,
      userCountry: this.userData.user.userCountry,
      userState: this.userData.user.userState,
      userCity: this.userData.user.userCity
    });
    this.changeCountryData();
    
  }

  /**
   * Fetch Country Names and Id's.
   * @returns {void}
   */
  fetchCountryData(): void {
    this.httpService.country().subscribe({
      next: (response: any) => {
        this.countryList = response?.data?.countries;
        this.countryList =  this.countryList.map((obj:any) => {
          return {value:obj.countryName, display: obj.countryName}
        })
        this.changeStateData();
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
      userCountry: value?.value,
    };
   
    this.httpService.state(data)?.subscribe({
      next: (response: any) => {
        this.stateData = response?.data?.states;

        this.stateData =  this.stateData.map((obj:any) => {
          return {value:obj.stateName, display: obj.stateName}
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
      userState: value?.value,
    };
    this.httpService.city(data)?.subscribe({
      next: (response: any) => {
        this.cityData = response?.data?.cities;
        this.cityData =  this.cityData.map((obj:any) => {
          return {value:obj.cityName, display: obj.cityName}
        })
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onUpdate() {

    console.log("on update running")
    if(this.loader) return

    if (this.updateForm.valid) {
      this.loader = true;
      const data = {
        userFirstName: this.updateForm.value.userFirstName,
        userLastName: this.updateForm.value.userLastName,
        userGender: this.updateForm.value.userGender,
        userCountry: this.updateForm.value.userCountry,
        userState: this.updateForm.value.userState,
        userCity: this.updateForm.value.userCity,
        userAge: parseInt(this.updateForm.value.age),
        userPhone: this.updateForm.value.userPhone,
      };
      this.httpService.updateUserProfile(data).subscribe({
        next: (response: any) => {
          this.loader = false;
          
          this.userService.setProfile({
            user_first_name: this.updateForm.value.userFirstName,
            user_last_name: this.updateForm.value.userLastName,
          });
          this.toster.success(response.message);
          this.route.navigateByUrl("/");
        },
        error: (err: any) => {
          console.log(err);
          this.loader = false;
        },
      });
    }
    else{
      this.toster.error("Enter All The Necessary Details");
    }
  }
}