import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  fetchAllMaskPattern(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/facemask/fetchAllMaskPattern');
  }



  selectCurrentDayFormat(data: any): Observable<any>{
    return this.http.post<any>("http://localhost:8080/facemask/selectWithMaskPattern", data);
  }
}