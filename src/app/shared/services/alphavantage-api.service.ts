import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { stockSymbol } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AlphavantageApiService {

  constructor(
	private _http: HttpClient
  ) { }
  
  private x: any[];
  
  private intradayUrl: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&outputsize=compact&symbol=GOOGL&interval=5min&apikey=DRGGM1B76NVM7H6W';
  private dailyUrl: string = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol=';

  // Holds stock data to display in line chart
  public stockDataSubject = new BehaviorSubject<any>({
      /* Initial value for the Behavior subject */
      stockData: [],
      range: "Weekly"
  });

  getIntradayData(): Observable<any[]> {
	  return this._http.get<any[]>(this.intradayUrl);//.map(a => this.x = a);
  }
  
  getDailyData(stockSymbol: string): Observable<any[]> {
	  return this._http.get<any[]>(this.dailyUrl + `${stockSymbol}&outputsize=full&apikey=DRGGM1B76NVM7H6W`);
  }

  getStockData(): Observable<any[]> {
    return this.stockDataSubject.asObservable();
  }

  /**
   * 
   * @param symbol searched item from homepage
   * @param searchBy company name or stock
   */
  searchStock(symbol: string, searchBy: string): Observable<any[]> {
    let getStockName: string;
    let url: string;

    // Return (from constants - stockSymbol) stock symbol for given stock name, when searched by stock name
    if (searchBy === 'byCompany' && stockSymbol.hasOwnProperty(symbol.toLowerCase())) {
      getStockName = stockSymbol[symbol.toLowerCase()];
    } else if (searchBy === 'byCompany' && !stockSymbol.hasOwnProperty(symbol.toLowerCase())) {
      // One way of doing it
      /*let observable = Observable.create(observer => {
        observer.next(["Stock didn't found"]);
      });*/

      // Other way
      const $observable = of(["Stock was not found"]);

      //return observable;
      return $observable;
    }

    if (searchBy === 'byCompany') {
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol=${getStockName}&outputsize=full&apikey=DRGGM1B76NVM7H6W`;
    } else if (searchBy === 'bySymbol') {
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol=${symbol}&outputsize=full&apikey=DRGGM1B76NVM7H6W`;
    }

    return this._http.get<any[]>(url);
  }
  
}
