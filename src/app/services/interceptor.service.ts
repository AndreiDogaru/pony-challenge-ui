import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        event => {},
        err => {
          this.toastr.error(err.error || 'Something went wrong');
          if (this.router.url !== '/home') {
            this.router.navigate(['/home']);
          }
        }
      )
    );
  }
}
