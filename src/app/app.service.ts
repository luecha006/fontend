import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isLogin: boolean;
  temperature: number;
  req: any;
  constructor(private http: HttpClient) { }

  setTemperature(value: number): void {
    this.temperature = value;
  }
  getTemperature(): number {
    return this.temperature;
  }

  setIsLogin(value: boolean){
    this.isLogin = value;
  }
  getIsLogin(): boolean{
    return this.isLogin;
  }

  login(data: any): Observable<any> {
    let dataLogin = {
      username: data.username,
      password: data.password
    }
    return this.http.post<any>('http://localhost:8080/admin/login', dataLogin);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/admin/register', data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/admin/changepassword', data);
  }

  fetchAllAdmin(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/admin/fetchAllAdmin');
  }

  delectAdmin(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/admin/delete', data);
  }

  extractTemperature(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/temperature/extract');
  }

  saveTemperature(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/temperature/save', data);
  }

  examineAdmin(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/admin/examineadmin');
  }

}
