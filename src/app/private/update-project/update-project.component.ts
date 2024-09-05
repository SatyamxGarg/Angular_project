import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputBoxComponent } from "../../common/components/UI/form-elements/input-box/input-box.component";
import { SelectDropdownComponent } from '../../common/components/UI/form-elements/select-dropdown/select-dropdown.component';
import { ButtonComponent } from "../../common/components/UI/form-elements/button/button.component";
import { UserService } from '../../services/user.service';
import { DatePickerComponent } from '../../common/components/UI/form-elements/date-picker/date-picker.component';
import { cloneSVG } from '@ant-design/icons-angular';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [ReactiveFormsModule, InputBoxComponent, SelectDropdownComponent, ButtonComponent, FormsModule,DatePickerComponent],
   templateUrl: './update-project.component.html',
   styleUrl: './update-project.component.scss'
})
export class UpdateProjectComponent implements OnInit {
  projectId: string | null = null;
  userData: any;
  updateForm: any;
  mngmtOptions = [{ value: 'Trello', display: 'Trello' }, { value: 'Zira', display: 'Zira' }];
  repoOptions = [{ value: 'Git Lab', display: 'Git Lab' }, { value: 'Bucket List', display: 'Bucket List' }];
  statusOptions = [{ value: 'Coming Soon', display: 'Coming Soon' }, { value: 'Development Started', display: 'Development Started' }, { value: 'Launched', display: 'Launched' }];
  loader: boolean = false;

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectId = params.get('id');      
      if (this.projectId) {
        this.getProjectDetails(this.projectId);
      }
    });
    this.updateForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectTech: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectLead: ['', Validators.required],
      projectManager: ['', Validators.required],
      projectClient: ['', Validators.required],
      mngmtTool: ['', Validators.required],
      projectUrl: ['', Validators.required],
      repoTool: ['', Validators.required],
      repoUrl: ['', Validators.required],
      projectStatus: ['', Validators.required],
      startDate: ['', Validators.required],
      DeadlineDate: ['', Validators.required],
});
  }

  // getProjectDetails(projectId: string) {
  //   const token = localStorage.getItem('token');
  //   this.httpService.getProjectDetails(token,projectId).subscribe({
  //     next: (response: any) => {

  //       const formatDate = (date: Date | null): string => {
  //         if (!date) return '';
  //         const year = date.getFullYear();
  //         const month = ('0' + (date.getMonth() + 1)).slice(-2);
  //         const day = ('0' + date.getDate()).slice(-2);
  //         return `${month}-${date}-${year}`;
  //       };
  
  //       if (response.data[0]) {
  //         this.userData = response.data[0]
  //         this.updateForm.patchValue({
  //           projectName: response.data[0].project_name,
  //           projectDesc: response.data[0].project_description,
  //           projectTech: response.data[0].project_tech,
  //           projectStatus: response.data[0].project_status,
  //           projectLead: response.data[0].project_lead,
  //           projectManager: response.data[0].project_manager,
  //           projectClient: response.data[0].project_client,
  //           mngmtTool: response.data[0].management_tool,
  //           projectUrl: response.data[0].management_url,
  //           repoTool: response.data[0].repo_tool,
  //           repoUrl: response.data[0].repo_url,
  //           // startDate: response.data[0].project_startDate,
  //           startDate: formatDate(response.data[0].project_startDate),
  //           // DeadlineDate: response.data[0].project_deadlineDate,
  //           DFeadlineDate: formatDate(response.data[0].project_deadlineDate),

  //         });
  //       }
  //     },
  //     error: (err: any) => {
  //       console.error(err);
  //     },
  //   });
  // }
  getProjectDetails(projectId: string) {
    const token = localStorage.getItem('token');
    this.httpService.getProjectDetails(token, projectId).subscribe({
        next: (response: any) => {
          const formatDate1 = (dateStr: string | null): Date => {
            if (!dateStr) return new Date();
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return new Date(); 
            return date;
        };
        const formatDateString = (date: Date): string => {
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            return `${month}-${day}-${year}`;
        };
        

            if (response.data[0]) {
                this.userData = response.data[0];
                this.updateForm.patchValue({
                    projectName: response.data[0].projectName,
                    projectDescription: response.data[0].projectDescription,
                    projectTech: response.data[0].projectTech,
                    projectStatus: response.data[0].projectStatus,
                    projectLead: response.data[0].projectLead,
                    projectManager: response.data[0].projectManager,
                    projectClient: response.data[0].projectClient,
                    mngmtTool: response.data[0].managementTool,
                    projectUrl: response.data[0].managementUrl,
                    repoTool: response.data[0].repoTool,
                    repoUrl: response.data[0].repoUrl,
                    startDate: formatDate1(response.data[0].projectStartDate),
                    DeadlineDate: formatDate1(response.data[0].projectDeadlineDate),
                });
            }
        },
        error: (err: any) => {
            console.error(err);
        },
    });
}


  onUpdate() {
    if (this.loader || !this.projectId) return;

    if (this.updateForm.valid) {
      this.loader = true;

      const formatDate = (date: Date | null): string => {
        if (!date) return '';
        const year = date.getFullYear();
        
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };
      const data = {
        projectName: this.updateForm.value.projectName,
        projectDescription: this.updateForm.value.projectDescription,
        projectTech: this.updateForm.value.projectTech,
        projectStatus: this.updateForm.value.projectStatus,
        projectLead: this.updateForm.value.projectLead,
        projectManager: this.updateForm.value.projectManager,
        projectClient: this.updateForm.value.projectClient,
        managementTool: this.updateForm.value.mngmtTool,
        managementUrl: this.updateForm.value.projectUrl,
        repoTool: this.updateForm.value.repoTool,
        repoUrl: this.updateForm.value.repoUrl,
        projectStartDate: formatDate(this.updateForm.value.startDate),
        projectDeadlineDate: formatDate(this.updateForm.value.DeadlineDate),
      };

      this.httpService.updateProject(this.projectId, data).subscribe({
        next: (response: any) => {
          this.loader = false;
          this.toastr.success(response.message);
          this.route.navigateByUrl("/profile/projects");
        },
        error: (err: any) => {
          console.error(err);
          this.loader = false;
        },
      });
    }
    else{
      this.toastr.error("Enter All The Necessary Details");
    }
  }
}
