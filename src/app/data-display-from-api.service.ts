import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable()

export class DataDisplayFromAPI {
	
	result:any;
	
	constructor(private _http: HttpClient) {}
	
	getPrices(coinsList) {
		return this._http.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms="+coinsList+"&tsyms=USD");
		//.map(result => this.result = result);
	}
}