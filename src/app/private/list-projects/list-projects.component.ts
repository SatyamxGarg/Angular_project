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
  imports: [
    CommonModule,
    AgGridAngular
  ],  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.scss'
})


export class  ListProjectsComponent implements OnInit {
  user!: Array<any>;
  columnDefs: ColDef[] =[];
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
            console.log(this.user);
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
           
    ];
  }
}