import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl = "http://localhost:5000"

  constructor(private http: HttpClient) { }

  get<T>(endPoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endPoint}`)
  }

  post<T>(endpoint: string, payload: any): Observable<T> {
    console.log('API Service - POST Request:', {
      url: `${this.baseUrl}/${endpoint}`,
      payload: payload
    });
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, payload)
  }




}
