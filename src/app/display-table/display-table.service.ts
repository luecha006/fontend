import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayTableService {

  constructor(private http: HttpClient) { }

  fetchAllMaskPattern(): Observable<any>{
    return this.http.get<any>('http://35.213.141.41:8080/facemask/fetchAllMaskPattern');
  }
}
