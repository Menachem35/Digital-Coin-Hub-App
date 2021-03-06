import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  constructor(private _http: HttpClient) { }

  // https://exchangeratesapi.io/
  exchangeAatesApiEndPoint: string = 'https://api.exchangeratesapi.io/';

  /**
   * Get FOREX rates from API
   * @param base currency base to get the rate for
   */
  getExchangeRates(base: string): Observable<any> {

    return this._http.get<any>(this.exchangeAatesApiEndPoint + `latest?base=${base}`);
  }

  /**
   * Get pairs exchange rate
   * @param coin1
   * @param coin2 
   */
  getExchangeRateCurrenciesPair(coin1: string, coin2: string): Observable<any> {
    return this._http.get<any>(this.exchangeAatesApiEndPoint + `latest?symbols=${coin1},${coin2}`);
  }
}
