
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
