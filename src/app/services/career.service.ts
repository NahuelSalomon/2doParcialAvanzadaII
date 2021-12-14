import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private url: string = "https://utn-lubnan-api-3.herokuapp.com/api/Career";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.url);
  }

}
