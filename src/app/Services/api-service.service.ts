import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl="https://api.example.com"

  constructor(private http:HttpClient) { }

  get<T>(endPoint:string):Observable<T>{
    return this.http.get<T>(`${this.baseUrl}/${endPoint}`)
  }

  post<T>(endpoint:string,payload:any):Observable<T>{
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`,payload)
  }


}
