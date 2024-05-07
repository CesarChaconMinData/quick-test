import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { IntHero } from 'src/app/modules/heros/schemas/heros.interface';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  private delayRequest = 500;
  private data: IntHero[] = [];

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, body } = request;
    if (url.endsWith('/heros') && method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.data })).pipe(delay(this.delayRequest));
    }

    if (url.match(/\/heros\/\d+$/) && method === 'GET') {
      const id = parseInt(url.split('/').pop() || '');
      return of(
        new HttpResponse({
          status: 200,
          body: this.data.find((data) => data.id === id),
        })
      ).pipe(delay(this.delayRequest));
    }

    if (url.endsWith('/heros') && method === 'POST') {
      const newHero = { id: this.data.length + 1, ...body };
      this.data.push(newHero);
      return of(new HttpResponse({ status: 200, body: newHero })).pipe(delay(this.delayRequest));
    }

    if (url.match(/\/heros\/\d+$/) && method === 'DELETE') {
      const id = parseInt(url.split('/').pop() || '');
      this.data = this.data.filter((x) => x.id !== id);
      return of(new HttpResponse({ status: 200, body: { id } })).pipe(delay(this.delayRequest));
    }

    if (url.match(/\/heros\/\d+$/) && method === 'PUT') {
      const id = parseInt(url.split('/').pop() || '');
      const index = this.data.findIndex((x) => x.id === id);
      if (index > -1) {
        this.data[index] = { ...this.data[index], ...body };
        return of(new HttpResponse({ status: 200, body: this.data[index] })).pipe(delay(this.delayRequest));
      }
    }

    return next.handle(request);
  }
}
