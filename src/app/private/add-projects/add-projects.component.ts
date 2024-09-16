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
import { DatePickerComponent } from '../../common/components/UI/form-elements/date-picker/date-picker.component';

@Component({
  selector: 'app-add-projects',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputBoxComponent, SelectDropdownComponent, ButtonComponent, FormsModule, DatePickerComponent],
  templateUrl: './add-projects.component.html',
  styleUrl: './add-projects.component.scss'
})

export class AddProjectsComponent {
  userData: any;
  addForm: any;
  mngmtOptions = [{value:'Trello',display:'Trello'},{value:'Zira',display:'Zira'}];
  repoOptions = [{value:'Git Lab',display:'Git Lab'},{value:'Bucket List',display:'Bucket List'}];
  statusOptions = [{value:'cooming Soon',display:'Cooming Soon'},{value:'Development Started',display:'Development Started'},{value:'Launched',display:'Launched'}];


  loader: boolean = false;
 
  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private toster: ToastrService,
    private route: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectTech: ['', Validators.required],
      projectDesc: ['', Validators.required],
      projectLead: ['', Validators.required],
      projectManager: ['', Validators.required],
      projectClient: ['', Validators.required],
      mngmtTool: ['', Validators.required],
      projectUrl: ['', Validators.required],
      repoTool: ['', Validators.required],
      repoUrl: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      DeadlineDate: ['', Validators.required],
    });
    
  }

  


  onAdded() {
    if (this.loader) return;

    if (this.addForm.valid) {
      this.loader = true;
      const token = localStorage.getItem("token");

      const formatDate = (date: Date | null): string => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };

      const data = {
        projectName: this.addForm.value.projectName,
        projectDescription: this.addForm.value.projectDesc,
        projectTech: this.addForm.value.projectTech,
        projectStatus: this.addForm.value.status,
        projectLead: this.addForm.value.projectLead,
        projectManager: this.addForm.value.projectManager,
        projectClient: this.addForm.value.projectClient,
        managementTool: this.addForm.value.mngmtTool,
        managementUrl: this.addForm.value.projectUrl,
        repoTool: this.addForm.value.repoTool,
        repoUrl: this.addForm.value.repoUrl,
        projectStartDate: formatDate(this.addForm.value.startDate),
        projectDeadlineDate: formatDate(this.addForm.value.DeadlineDate),
      };

      this.httpService.addProject(data).subscribe({
        next: (response: any) => {
          this.loader = false;
          this.toster.success(response.message);
          this.route.navigateByUrl("/profile/projects");
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

