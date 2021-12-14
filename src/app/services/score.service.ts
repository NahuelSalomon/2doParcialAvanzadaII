import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private url: string = "https://utn-lubnan-api-3.herokuapp.com/api/Score";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.url);
  }

  add(score: Score) : Observable<any>  {
    console.log(score);
    
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
  
    return this.http.post(this.url+"/save",score,httpOptions);
   }

}
