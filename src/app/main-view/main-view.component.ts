import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
		private fb: FormBuilder,
		private coinsRateCryptoCompare: DataDisplayFromAPI,
		private x: AlphavantageApiService
	) {}

	public getStockForm: FormGroup;
	
	title = 'Digital Coin Hub';
	public stockSymbol: string = '';
	public stock: string = '';
	public stockFromSearch: string = ''; // Return the searched stock

	columnDefs = [
        {headerName: 'Stock', field: 'stock' },
        {headerName: 'Symbol', field: 'symbol' },
        {headerName: 'Price', field: 'price'}
    ];

    rowData = [
        { stock: 'Google', symbol: 'GOOGL', price: ''  },
        { stock: 'Apple', symbol: 'AAPL', price: '' },
		{ stock: 'Microsoft', symbol: 'MSFT', price: '' },
		{ stock: 'Tesla', symbol: 'TSLA', price: '' }
    ];

	buildStokForm(): void {
		this.getStockForm = this.fb.group({
			'stockName': [null]
		});
	}

	searchStock(): void {
		this.x.searchStock(this.getStockForm.value.stockName).subscribe(data => {
			this.stockFromSearch = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]]["4. close"];
		});
	}
	
	ngOnInit () {
		this.buildStokForm();
		this.coinsRateCryptoCompare.getPrices('BTC,ETH,LTC,BCH,IOT,XRP,XVG,FCT')
			.subscribe(res => {
				this.cryptos = res;
		});
		
		this.x.getIntradayData().subscribe(a => {
			//console.log(a);
			console.log(a["Meta Data"]["2. Symbol"]);
			//console.log(a["Time Series (5min)"]);
			this.stockSymbol = a["Meta Data"]["2. Symbol"];
		});
		this.x.getDailyData().subscribe(a => {
			//console.log( a/*["Meta Data"]["2. Symbol"], "shoko"*/);
			//console.log(a["Meta Data"]["1. Information"]);
			//console.log(a["Time Series (Daily)"]);
			//console.log(Object.keys(a["Time Series (Daily)"])[Object.keys(a["Time Series (Daily)"]).length-1]);
			console.log(a["Time Series (Daily)"][Object.keys(a["Time Series (Daily)"])[0]]["4. close"]);
			this.stock = a["Time Series (Daily)"][Object.keys(a["Time Series (Daily)"])[0]]["4. close"];
		});
	}
 
	
}
	