import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlphavantageApiService {

  constructor(
	private _http: HttpClient
  ) { }
  
  private x: any[];
  
  private intradayUrl: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=DRGGM1B76NVM7H6W';
  
  getIntradayData(): Observable<any[]> {
	  return this._http.get<any[]>(this.intradayUrl);//.map(a => this.x = a);
  }
  
}
