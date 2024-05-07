import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  private loadingService = inject(LoadingService);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.includes('heros') && !this.loadingService.isLoadingShow &&
      (request.method === 'GET' ||
        request.method === 'POST' ||
        request.method === 'PUT' ||
        request.method === 'DELETE')
    ) {
      this.loadingService.show();

      return next.handle(request).pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
