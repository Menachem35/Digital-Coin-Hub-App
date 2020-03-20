import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { DataDisplayFromAPI } from '../data-display-from-api.service';
import { AlphavantageApiService } from '../shared/services/alphavantage-api.service';

import { stockSymbol } from '../shared/constants'; 

import { OverlaySpinnerComponent } from '../shared/overlay-spinner/overlay-spinner.component';

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
		private x: AlphavantageApiService,
		public dialog: MatDialog
	) {}

	public getStockForm: FormGroup;

	private subject = new Subject<boolean>(); // When get data from API close modal
	
	title = 'Digital Coin Hub';
	public stockSymbol: string = '';
	public stock: string = '';
	public stockFromSearch: string = ''; // Return the searched stock

	columnDefs = [
        {headerName: 'Stock', field: 'stock', width: 150 },
        {headerName: 'Symbol', field: 'symbol', width: 150 },
        {headerName: 'Price', field: 'price', width: 100}
    ];

    rowData = Object.keys(stockSymbol).map(x => {
		return {stock: [x], symbol: stockSymbol[x], price:''}
	});
	/*[
        { stock: 'Google', symbol: 'GOOGL', price: ''  },
        { stock: 'Apple', symbol: 'AAPL', price: '' },
		{ stock: 'Microsoft', symbol: 'MSFT', price: '' },
		{ stock: 'Tesla', symbol: 'TSLA', price: '' }
    ];*/

	buildStokForm(): void {
		this.getStockForm = this.fb.group({
			'stockName': [null]
		});
	}

	searchStock(): void {
		// Open spinner
		this.dialog.open(OverlaySpinnerComponent, {
			data: {
			  gotData: this.gotSearchedStock()
			},
			height: '400px',
  			width: '600px'
		});

		this.x.searchStock(this.getStockForm.value.stockName).subscribe(data => {
			if (/*data[0] === "Stock was not found"*/Array.isArray(data)) {
				setTimeout(() => {
					this.subject.next(true);
				}, 1000);
				
				this.stockFromSearch = data[0];
			} else {
				this.subject.next(true);
				this.stockFromSearch = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]]["4. close"];
			}
		}, error => {
			console.log(error);
		});
	}

	gotSearchedStock(): Observable<boolean> {
		return this.subject.asObservable();
	}
	
	ngOnInit () {
		this.subject.next(false); // Didn't get yet data from API
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
	