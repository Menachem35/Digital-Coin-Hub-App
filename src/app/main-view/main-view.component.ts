import { Component, OnInit } from '@angular/core';

import { DataDisplayFromAPI } from '../data-display-from-api.service';
import { AlphavantageApiService } from '../shared/services/alphavantage-api.service';

@Component({
	selector: 'main-view',
	templateUrl: './main-view.component.html',
	styleUrls: ['./main-view.component.scss']
})

export class MainViewComponent implements OnInit {
	
	objectKeys = Object.keys;
    cryptos: any;
  
	constructor (
		private coinsRateCryptoCompare: DataDisplayFromAPI,
		private x: AlphavantageApiService
	) {}
	
	title = 'Digital Coin Hub';
	
	ngOnInit () {
		this.coinsRateCryptoCompare.getPrices('BTC,ETH,LTC,BCH,IOT,XRP,XVG,FCT')
			.subscribe(res => {
				this.cryptos = res;
		});
		
		this.x.getIntradayData().subscribe(a => {
			//console.log(a);
			console.log(a["Meta Data"]["2. Symbol"]);
			//console.log(a["Time Series (5min)"]);
		});
		this.x.getDailyData().subscribe(a => {
			//console.log( a/*["Meta Data"]["2. Symbol"], "shoko"*/);
			//console.log(a["Meta Data"]["1. Information"]);
			//console.log(a["Time Series (Daily)"]);
			//console.log(Object.keys(a["Time Series (Daily)"])[Object.keys(a["Time Series (Daily)"]).length-1]);
			console.log(a["Time Series (Daily)"][Object.keys(a["Time Series (Daily)"])[0]]["4. close"]);
		});
	}
 
	
}
	