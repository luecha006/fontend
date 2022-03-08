import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  req : any;
  constructor(private http: HttpClient ){ }

  login(data: any): Observable<any> {
    let dataLogin = {
      username: data.username,
      password: data.password
    }
    return this.http.post<any>('http://localhost:8080/admin/login', dataLogin);
  }

  register(data: any): Observable<any>{
    return this.http.post<any>('http://localhost:8080/admin/register', data);
  }

  changePassword(data: any): Observable<any>{
    return this.http.post<any>('http://localhost:8080/admin/changepassword', data);
  }

  fetchAllAdmin(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/admin/fetchAllAdmin');
  }

  delectAdmin(data: any): Observable<any>{
    return this.http.post<any>('http://localhost:8080/admin/delete', data);
  }

  extractTemperature(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/temperature/extract');
  }

  saveTemperature(data: any): Observable<any>{
    return this.http.post<any>('http://localhost:8080/temperature/save', data);
  }
}
