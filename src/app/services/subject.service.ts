import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private url: string = "https://utn-lubnan-api-3.herokuapp.com/api/Subject";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.url);
  }

  getByName(name: string): Observable<any>{
    return this.http.get(this.url+"/GetByName/"+name);
  }


}
