import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        event => {},
        err => {
          if (err.hasOwnProperty('error')) {
            if (typeof err.error === 'string') {
              this.toastr.error(err.error);
            } else if (err.error.hasOwnProperty('errors')) {
              for (const prop in err.error.errors) {
                if (Object.prototype.hasOwnProperty.call(err.error.errors, prop)) {
                  this.toastr.error(`${prop}: ${err.error.errors[prop]}`);
                }
              }
            }
          }
        }
      )
    );
  }
}
