import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient) { }

  Report(data: any): Observable<any>{
    return this.http.post<any>('http://35.213.141.41:8080/facemask/ExportPage', data);
  }
}
