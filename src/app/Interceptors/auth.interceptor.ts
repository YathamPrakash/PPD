import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, finalize } from 'rxjs';
import { CommonService } from '../Services/common.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const commonService = inject(CommonService)
  let token = localStorage.getItem('token');

  commonService.show();
  const modifiedRequest = token ? req.clone({
    setHeaders: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json'
    }
  }) : req;

  return next(modifiedRequest).pipe(
    finalize(()=>{
      commonService.hide();
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Unable to connect to server';

      if (error.status == 0) {
        errorMessage = "Unable to connect to the server"
      }
      else if (error.status == 400) {
        errorMessage = "Bad Request"
      }
      else if (error.status == 401) {
        errorMessage = 'Unauthorized! Please login again';
        localStorage.removeItem('token');
      }
      else if (error.status == 403) {
        errorMessage = "Access Denied"
      }
      else if (error.status == 500) {
        errorMessage = "Server Error"
      }
      else if (error.status == 404) {
        errorMessage = "Method Not Found"
      }
      else if (error.error?.message) {
        errorMessage = error.error.message;
      }
      else if (error.status === 400) {
        errorMessage = 'Bad Request';
      }
      commonService.showErrorMessage(errorMessage)
      return throwError(() => error)
    })

  );
};

