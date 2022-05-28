import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchInformationService {

  constructor(private http: HttpClient ) { }

  Search(data: any): Observable <any>{
    return this.http.post<any>('http://localhost:8080/facemask/selectSearchInformationPage', data);
  }
}
