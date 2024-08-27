
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpService } from '../../services/http.service';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { AgGridAngular } from 'ag-grid-angular';
// import { ColDef } from 'ag-grid-community';

// @Component({
//   selector: 'app-users',
//   standalone: true,
//   imports: [
//     CommonModule,
//     AgGridAngular
//   ],
//   // templateUrl: './users.component.html',
//   // styleUrls: ['./users.component.scss']
// })
// export class UsersComponent implements OnInit {
//   user!: Array<any>;
//   columnDefs: ColDef[] = [];
//   defaultColDef: ColDef = {
//     sortable: true,
//     filter: true,
//     resizable: true
//   };

//   constructor(
//     private httpService: HttpService,
//     private toastr: ToastrService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.loadUsers();
//     this.setColumnDefs();
//   }

//   loadUsers() {
//     const token = localStorage.getItem('token');
//     if (token) {
//       this.httpService.getAllUsers(token).subscribe({
//         next: (response: any) => {
//           if (response.status) {
//             this.user = response.data[0];
//             console.log(this.user);
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

//   setColumnDefs() {
//     this.columnDefs = [
//       { headerName: 'Sr No.', valueGetter: 'node.rowIndex + 1', width: 100 },
//       { headerName: 'FIRST NAME', field: 'user_first_name' },
//       { headerName: 'LAST NAME', field: 'user_last_name' },
//       { headerName: 'AGE', field: 'user_age' },
//       { headerName: 'GENDER', field: 'user_gender' },
//       { headerName: 'PHONE', field: 'user_phone' },
//       { headerName: 'E-MAIL', field: 'user_email' },
//       {
//         headerName: 'Action',
//         cellRenderer: (params: any) => {
//           return `
//             <button class="btn btn-primary" onclick="window.editFunc('${params.data.user_id}')"><i class="fa-solid fa-pen"></i></button>
//             <button class="btn btn-danger" style="margin-left:5px;" onclick="window.delFunc()"><i class="fa-solid fa-trash"></i></button>
//           `;
//         },
//         width: 150
//       }
//     ];
//   }

//   onCellClicked(event: any) {
//     if (event.colDef.headerName === 'Action') {
//       // You can implement any specific action based on your needs
//     }
//   }
// }


// import { Component } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   FormsModule,
//   Validators,
// } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { cloneSVG } from '@ant-design/icons-angular';
// import { InputBoxComponent } from "../../common/components/UI/form-elements/input-box/input-box.component";
// import { SelectDropdownComponent } from '../../common/components/UI/form-elements/select-dropdown/select-dropdown.component';
// import { ButtonComponent } from "../../common/components/UI/form-elements/button/button.component";
// import { UserService } from '../../services/user.service';

// @Component({
//   selector: 'app-update-project',
//   standalone: true,
//   imports: [RouterLink, ReactiveFormsModule, InputBoxComponent, SelectDropdownComponent, ButtonComponent, FormsModule],
//   templateUrl: './update-project.component.html',
//   styleUrl: './update-project.component.scss'
// })
// export class UpdateProjectComponent {
//   userData: any;
//   updateForm: any;
//   mngmtOptions = [{value:'Trello',display:'Trello'},{value:'Zira',display:'Zira'}];
//   repoOptions = [{value:'Git Lab',display:'Git Lab'},{value:'Bucket List',display:'Bucket List'}];
//   statusOptions = [{value:'cooming Soon',display:'Cooming Soon'},{value:'Development Started',display:'Development Started'},{value:'Launched',display:'Launched'}];
//   loader: boolean = false;
 
//   constructor(
//     private httpService: HttpService,
//     private formBuilder: FormBuilder,
//     private toster: ToastrService,
//     private route: Router,
//     private userService: UserService
//   ) { }

//   ngOnInit() {
//     this.updateForm = this.formBuilder.group({
//       projectName: ['', Validators.required],
//       projectTech: ['', Validators.required],
//       projectDesc: ['', Validators.required],
//       projectLead: ['', Validators.required],
//       projectManager: ['', Validators.required],
//       projectClient: ['', Validators.required],
//       mngmtTool: ['', Validators.required],
//       projectUrl: ['', Validators.required],
//       repoTool: ['', Validators.required],
//       repoUrl: ['', Validators.required],
//       status: ['', Validators.required],
//       // startDate: ['', Validators.required],
//       // DeadlineDate: ['', Validators.required],
//     });
    
//   }


//   /**
//    * Fetch logged in user data.
//    * @returns {void}
//    */
//   getUserData(): void {
//     const token = localStorage.getItem("token");
//     this.httpService.getAllProjects(token).subscribe({
//       next: (response: any) => {
//         this.userData = response.data[0];
//         this.UpdateForm()
//       },
//       error: (err: any) => {
//         console.log(err);
//       },
//     });
//   }

//   UpdateForm(): void {
//     this.updateForm.patchValue({
//     projectName: this.userData.project_name,
//     project_description: this.userData.project_description,
//     project_tech: this.userData.project_tech,
//     project_status: this.userData.project_status,
//     project_lead: this.userData.project_lead,
//     project_manager: this.userData.project_manager,
//     project_client: this.userData.project_client,
//     management_tool: this.userData.management_tool,
//     management_url: this.userData.management_url,
//     repo_tool: this.userData.repo_tool,
//     repo_url: this.userData.repo_url,
//     // project_startDate: this.userData.project_startDate,
//     // project_deadlineDate: this.userData.project_deadlineDate,
//     });

//   }

//   onUpdate() {

//     if(this.loader) return

//     if (this.updateForm.valid) {
//       this.loader = true;
//       const data = {
//         project_name: this.updateForm.value.projectName,
//         project_description: this.updateForm.value.projectDesc,
//         project_tech: this.updateForm.value.projectTech,
//         project_status: this.updateForm.value.status,
//         project_lead: this.updateForm.value.projectLead,
//         project_manager: this.updateForm.value.projectManager,
//         project_client: this.updateForm.value.projectClient,
//         management_tool: this.updateForm.value.mngmtTool,
//         management_url: this.updateForm.value.projectUrl,
//         repo_tool: this.updateForm.value.repoTool,
//         repo_url: this.updateForm.value.repoUrl,
//         // project_startDate: this.updateForm.value.startDate,
//         // project_deadlineDate: this.updateForm.value.DeadlineDate,
    
//       };
//       this.httpService.updateProject(data).subscribe({
//         next: (response: any) => {
//           this.loader = false;
         
//           this.toster.success(response.message);
//           this.route.navigateByUrl("/");
//         },
//         error: (err: any) => {
//           console.log(err);
//           this.loader = false;
//         },
//       });
//     }
//   }
// }
