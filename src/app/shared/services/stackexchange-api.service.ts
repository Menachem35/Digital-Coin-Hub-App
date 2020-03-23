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

  constructor(private _http: HttpClient) { }

  getStackexchangeAnswers(): Observable<any[]> {

    return this._http.get<any[]>('https://api.stackexchange.com/docs/questions#fromdate=2020-03-02&todate=2020-03-22&order=desc&sort=activity&tagged=angular&filter=default&site=stackoverflow');
  }
}
