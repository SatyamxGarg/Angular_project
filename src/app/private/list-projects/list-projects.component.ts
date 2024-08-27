import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.scss'
})

export class ListProjectsComponent implements OnInit {
  user: Array<any> = [];
  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: false,
    resizable: true
  };

  constructor(
    private httpService: HttpService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.setColumnDefs();
  }

  loadUsers() {
    const token = localStorage.getItem('token');
    if (token) {
      this.httpService.getAllProjects(token).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.user = response.data[0];
          } else {
            this.toastr.error(response.message);
            this.router.navigate(['/list-projects']);
          }
        },
        error: (error) => {
          this.toastr.error(error.error.message);
          this.router.navigate(['/profile']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  onAdd() {
    this.router.navigate(['/profile/list-projects/add-projects']);
  }

  onUpdate(projectId: string) {
    this.router.navigate(['/profile/list-projects/update-project/',projectId]);
  }
  

  onDelete(projectId: string) {
    const token = localStorage.getItem('token');
    if (token) {
      this.httpService.dltProject(projectId).subscribe({
        next: (response: any) => {
          if (response.status) {
            this.user = this.user.filter(project => project.project_id !== projectId);
            this.toastr.success('Project deleted successfully');
          } else {
            this.toastr.error(response.message);
          }
        },
        error: (error: any) => {
          this.toastr.error(error.error.message);
          this.router.navigate(['/profile/list-projects']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  // setColumnDefs() {
  //   this.columnDefs = [
  //     { headerName: 'Sr No.', valueGetter: 'node.rowIndex + 1', width: 80, sortable: false },
  //     { headerName: 'PROJECT NAME', field: 'project_name' },
  //     { headerName: 'PROJECT DESCRIPTION', field: 'project_description' },
  //     { headerName: 'PROJECT TECH', field: 'project_tech' },
  //     { headerName: 'STATUS', field: 'project_status' },
  //     { headerName: 'PROJECT LEAD', field: 'project_lead' },
  //     { headerName: 'PROJECT MANAGER', field: 'project_manager' },
  //     { headerName: 'PROJECT CLIENT', field: 'project_client' },
  //     { headerName: 'MANAGEMENT TOOL', field: 'management_tool' },
  //     { headerName: 'MANAGEMENT URL', field: 'management_url' },
  //     { headerName: 'REPOSITORY TOOL', field: 'repo_tool' },
  //     { headerName: 'REPOSITORY URL', field: 'repo_url' },
  //     { headerName: 'START DATE', field: 'project_startDate' },
  //     { headerName: 'DEADLINE DATE', field: 'project_deadlineDate' },
  //     {
  //       headerName: 'Action',
  //       cellRenderer: (params: any) => {
  //         const projectId = params.data.project_id;
  //         const button = document.createElement('button');
  //         button.className = 'btn btn-danger';
  //         button.style.marginLeft = '5px';
  //         button.innerHTML = '<i class="fas fa-trash"></i>';

  //         button.addEventListener('click', () => {
  //           params.context.componentParent.onDelete(projectId);
  //         });

  //         return button;
  //       },
  //       width: 150,
  //       cellRendererParams: {
  //         context: {
  //           componentParent: this
  //         }
  //       }
  //     }
  //   ];
  // }
  setColumnDefs() {
    this.columnDefs = [
      { headerName: 'Sr No.', valueGetter: 'node.rowIndex + 1', width: 80, sortable: false },
      { headerName: 'PROJECT NAME', field: 'project_name' },
      { headerName: 'PROJECT DESCRIPTION', field: 'project_description' },
      { headerName: 'PROJECT TECH', field: 'project_tech' },
      { headerName: 'STATUS', field: 'project_status' },
      { headerName: 'PROJECT LEAD', field: 'project_lead' },
      { headerName: 'PROJECT MANAGER', field: 'project_manager' },
      { headerName: 'PROJECT CLIENT', field: 'project_client' },
      { headerName: 'MANAGEMENT TOOL', field: 'management_tool' },
      { headerName: 'MANAGEMENT URL', field: 'management_url' },
      { headerName: 'REPOSITORY TOOL', field: 'repo_tool' },
      { headerName: 'REPOSITORY URL', field: 'repo_url' },
      { headerName: 'START DATE', field: 'project_startDate' },
      { headerName: 'DEADLINE DATE', field: 'project_deadlineDate' },
      {
        headerName: 'Action',
        cellRenderer: (params: any) => {
          const projectId = params.data.project_id;
  
          const updateButton = document.createElement('button');
          updateButton.className = 'btn btn-primary';
          updateButton.style.marginLeft = '5px';
          updateButton.innerHTML = '<i class="fas fa-edit"></i>';
          updateButton.addEventListener('click', () => {
            params.context.componentParent.onUpdate(projectId);
          });
  
          const deleteButton = document.createElement('button');
          deleteButton.className = 'btn btn-danger';
          deleteButton.style.marginLeft = '5px';
          deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
          deleteButton.addEventListener('click', () => {
            params.context.componentParent.onDelete(projectId);
          });
  
          const buttonContainer = document.createElement('div');
          buttonContainer.appendChild(updateButton);
          buttonContainer.appendChild(deleteButton);
  
          return buttonContainer;
        },
        width: 200, 
        cellRendererParams: {
          context: {
            componentParent: this
          }
        }
      }
    ];
  }
  
}
