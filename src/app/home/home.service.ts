import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  selectHomePageDateCurrent(): Observable<any>{
    return this.http.get<any>("http://localhost:8080/facemask/selectHomePageDateCurrent");
  }

  fetchAllMaskPattern(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/facemask/fetchAllMaskPattern');
  }

  selectHomePageFormat(data: any): Observable<any>{
    return this.http.post<any>("http://localhost:8080/facemask/selectWithMaskPattern", data);
  }
}
