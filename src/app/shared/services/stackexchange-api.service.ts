/**
 * @class StackexchangeApiService
 * Sevice to get latest questions about crypto / blockchain from Stackexchange
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StackexchangeApiService {
  // API docs:
  // https://api.stackexchange.com/docs

  private baseUrl: string = 'https://api.stackexchange.com/2.2/';

  constructor(private _http: HttpClient) { }

  getStackexchangeAnswers(): Observable<any[]> {
    let requestUrl: string = 'search?order=desc&sort=creation&tagged=bitcoin; blockchain&site=stackoverflow';
    //'/2.2/search?order=desc&sort=creation&tagged=bitcoin; blockchain&site=stackoverflow';
    
    return this._http.get<any[]>(this.baseUrl + requestUrl);
  }
}
