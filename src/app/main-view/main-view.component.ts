import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, Observable, from } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { AlphavantageApiService } from '../shared/services/alphavantage-api.service';
import { BlogApiService } from '../shared/services/blog-api.service';
import { DataDisplayFromAPI } from '../data-display-from-api.service';
import { StackexchangeApiService } from '../shared/services/stackexchange-api.service';

import { PopularStock } from '../shared/popularStock'; // Popular stock interface
import { stockSymbol } from '../shared/constants'; // Matches stock name to stock symbol

import { OverlaySpinnerComponent } from '../shared/overlay-spinner/overlay-spinner.component';

@Component({
	selector: 'main-view',
	templateUrl: './main-view.component.html',
	styleUrls: ['./main-view.component.scss']
})

export class MainViewComponent implements OnInit {
	
	objectKeys = Object.keys;
	cryptos: any; // Gets cryptos values from API
	cryptosValues: any[]; // Holds crypto values to display in Chart
	cryptosValuesWithoutBTC: any[] // To display chart of cryptos without BitCoin
  
	constructor (
		private fb: FormBuilder,
		private coinsRateCryptoCompare: DataDisplayFromAPI,
		private x: AlphavantageApiService,
		private stackExchangeService: StackexchangeApiService,
		private blogService: BlogApiService,
		public dialog: MatDialog
	) {
		this.displayPopularStock = {
			stock: 'Google',
			symbol: 'GOOGL',
			value: 0
		}
	}

	public getStockForm: FormGroup;

	private subject = new Subject<boolean>(); // When get data from API close modal
	
	title = 'Digital Coin Hub';
	public displayPopularStock: PopularStock; // Display popular stock symbol at home page
	
	public stockFromSearch: any = {
		symbol: '',
		value: ''
	}; // Return the searched stock

	public weeklyChartData: any[]; // Hold weekly values of stock to display in home page chart

	public questionsFromStackExchange: any[]; // Array to hold response from stackexchange API

	public newsItems: any[]; // Get posts from API

	columnDefs = [
        { headerName: 'Stock', field: 'stock', width: 150 },
        { headerName: 'Symbol', field: 'symbol', width: 150 },
        { headerName: 'Price', field: 'price', width: 100}
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
			'stockName': [null],
			'stockSymbol': [null]
		});
	}

	/**
	 * 
	 * @param searchType search by company name - 'byCompany', or by stock symbol ('bySymbol').
	 */
	searchStock(searchType: string): void {
		// Open spinner
		this.dialog.open(OverlaySpinnerComponent, {
			data: {
			  gotData: this.gotSearchedStock()
			},
			height: '400px',
  			width: '600px'
		});

		let searchBy: string; // Stock name or stock symbol

		if (searchType === 'bySymbol') {
			searchBy = this.getStockForm.value.stockSymbol;
			this.displayPopularStock.stock = "";
		} else if (searchType === 'byCompany') {
			searchBy = this.getStockForm.value.stockName;
			this.displayPopularStock.stock = searchBy.toUpperCase();
		}

		this.x.searchStock(searchBy, searchType).subscribe(data => {
			if (/*data[0] === "Stock was not found"*/Array.isArray(data)) {
				setTimeout(() => {
					this.subject.next(true);
				}, 1000);
				
				this.stockFromSearch.value = data[0];
			} else {
				this.subject.next(true);
				this.stockFromSearch.symbol = data["Meta Data"]["2. Symbol"];
				this.displayPopularStock.symbol = data["Meta Data"]["2. Symbol"];
				this.stockFromSearch.value = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]]["4. close"];
				this.displayPopularStock.value = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]]["4. close"];

				this.weeklyChartData = Object.keys(data["Time Series (Daily)"]).map(x => {
					return {
						date: x,
						daily: data["Time Series (Daily)"][x]
					}	
				});
			}
		}, error => {
			console.log(error);
		});
	}

	gotSearchedStock(): Observable<boolean> {
		return this.subject.asObservable();
	}

	/**
	 * Get latest answers about blockchain / crypto
	 */
	getStackExchangeQuestions(): void {
		this.stackExchangeService.getStackexchangeAnswers().subscribe(data => {
			this.questionsFromStackExchange = data['items'].slice(0, 10);
			//console.log(data);
			console.log(data['items']);
		});
	}

	/**
	 * Get latest 10 blog posts from the blog
	 */
	getBlogPosts(): void {
		this.blogService.getDatafromBlog(10).subscribe(data => {
			this.newsItems = data;
			console.log(data);

			//console.log(data[0].content.rendered);
			//this.newsItem = data[0].content.rendered;

			console.log(data[0].title.rendered);
			console.log(data[0].excerpt.rendered);
		})
	}

	/**
	 * When click on news item, save data to shared service
	 * @param i - index of news item 
	 */
	displayNews(i: number): void {
		this.blogService.newsItem.title = this.newsItems[i].title.rendered;
		this.blogService.newsItem.content = this.newsItems[i].content.rendered;
	}
	
	ngOnInit () {
		this.getStackExchangeQuestions();
		this.subject.next(false); // Didn't get yet data from API
		this.buildStokForm();
		this.coinsRateCryptoCompare.getPrices('BTC,ETH,MKR,LTC,BCH,BSV,IOT,XRP,XVG')
			.subscribe(res => {
				this.cryptos = res;

				// Create crypto's values array to display in chart
				this.cryptosValues = Object.keys(res).map(x => {
					return {
						coin:x,
						value:res[x].USD
					};
				});

				this.cryptosValuesWithoutBTC = this.cryptosValues.filter(x => x.coin !== "BTC");
		});
		
		/*this.x.getIntradayData().subscribe(a => {
			//console.log(a);
			console.log(a["Meta Data"]["2. Symbol"]);
			//console.log(a["Time Series (5min)"]);
			this.stockSymbol = a["Meta Data"]["2. Symbol"];
		});*/
		this.x.getDailyData(this.displayPopularStock.symbol).subscribe(data => {
			// Build the array for the weekly chart
			this.weeklyChartData = Object.keys(data["Time Series (Daily)"]).map(x => {
				return {
					date: x,
					daily: data["Time Series (Daily)"][x]
				}	
			});
			console.log("Weekly chart", this.weeklyChartData);
			//console.log( a/*["Meta Data"]["2. Symbol"], "shoko"*/);
			//console.log(a["Meta Data"]["1. Information"]);
			//console.log(a["Time Series (Daily)"]);
			//console.log(Object.keys(a["Time Series (Daily)"])[Object.keys(a["Time Series (Daily)"]).length-1]);
			console.log(data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]]["4. close"]);

			this.displayPopularStock.value = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]]["4. close"];
		}, error => {
			console.log("Error message ALPHA VANTAGE", error);
		});

		this.getBlogPosts();
	}
 
	
}
	