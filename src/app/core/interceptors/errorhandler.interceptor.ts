import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from '@shared/services/notification/notification.service';

@Injectable()
export class ErrorhandlerInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const content = error?.error?.content || 'Unexpected error';
        console.error('An error occurred while processing your request. Details: ', content);
        this.notificationService.showErrorNotification(content);
        return throwError(error);
      })
    );
  }
}
