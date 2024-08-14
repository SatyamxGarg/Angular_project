import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem("token");
  const cloneReq=req.clone({
    setHeaders:{
      Authorization: `${token}`
    }
  });
  return next(cloneReq);
};
