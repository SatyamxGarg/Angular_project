import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  // console.log(token);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `${token}`,
      },
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401 && !error.url?.includes("change-password")) {
        toast.error('Session expired');
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
