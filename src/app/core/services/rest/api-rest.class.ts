import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class ApiRest {
  constructor(protected http: HttpClient) { }

  get<T>(url: string, options?: {}): Observable<T> {
    return this.http.get<T>(url, options);
  }

  getById<T>(url: string, id: string): Observable<T> {
    return this.http.get<T>(`${url}/${id}`);
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data);
  }

  put<T>(url: string, data: any, id: number): Observable<T> {
    return this.http.put<T>(`${url}/${id}`, data);
  }

  deleteById<T>(url: string, id: number): Observable<T> {
    return this.http.delete<T>(`${url}/${id}`);
  }
}
