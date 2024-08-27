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

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [ReactiveFormsModule, InputBoxComponent, SelectDropdownComponent, ButtonComponent, FormsModule],
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
      projectDesc: ['', Validators.required],
      projectLead: ['', Validators.required],
      projectManager: ['', Validators.required],
      projectClient: ['', Validators.required],
      mngmtTool: ['', Validators.required],
      projectUrl: ['', Validators.required],
      repoTool: ['', Validators.required],
      repoUrl: ['', Validators.required],
      projectStatus: ['', Validators.required],
      // startDate: ['', Validators.required],
      // DeadlineDate: ['', Validators.required],
});
  }

  getProjectDetails(projectId: string) {
    const token = localStorage.getItem('token');
    this.httpService.getProjectDetails(token,projectId).subscribe({
      next: (response: any) => {
        if (response.data[0]) {
          this.userData = response.data[0]
          this.updateForm.patchValue({
            projectName: response.data[0].project_name,
            projectDesc: response.data[0].project_description,
            projectTech: response.data[0].project_tech,
            projectStatus: response.data[0].project_status,
            projectLead: response.data[0].project_lead,
            projectManager: response.data[0].project_manager,
            projectClient: response.data[0].project_client,
            mngmtTool: response.data[0].management_tool,
            projectUrl: response.data[0].management_url,
            repoTool: response.data[0].repo_tool,
            repoUrl: response.data[0].repo_url,
            // startDate: response.data[0].project_startDate,
            // DeadlineDate: response.data[0].project_deadlineDate,
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
      const data = {
        project_name: this.updateForm.value.projectName,
        project_description: this.updateForm.value.projectDesc,
        project_tech: this.updateForm.value.projectTech,
        project_status: this.updateForm.value.projectStatus,
        project_lead: this.updateForm.value.projectLead,
        project_manager: this.updateForm.value.projectManager,
        project_client: this.updateForm.value.projectClient,
        management_tool: this.updateForm.value.mngmtTool,
        management_url: this.updateForm.value.projectUrl,
        repo_tool: this.updateForm.value.repoTool,
        repo_url: this.updateForm.value.repoUrl,
        // project_startDate: this.updateForm.value.startDate,
        // project_deadlineDate: this.updateForm.value.DeadlineDate,
      };

      this.httpService.updateProject(this.projectId, data).subscribe({
        next: (response: any) => {
          this.loader = false;
          this.toastr.success(response.message);
          this.route.navigateByUrl("/profile/list-projects");
        },
        error: (err: any) => {
          console.error(err);
          this.loader = false;
        },
      });
    }
  }
}
