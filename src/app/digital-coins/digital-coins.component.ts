import { Component, OnInit } from '@angular/core';

import { DCHlinks } from '../links'; //DCHlinks class 
import { DigitalCoinHubService } from '../digital-coin-hub.service';
import { DataDisplayFromAPI } from '../data-display-from-api.service';

@Component ({
	selector: 'digital-coins',
	templateUrl: 'digital-coins.component.html',
	styleUrls: ['./digital-coins.component.scss']
})

export class DigitalCoinsComponent implements OnInit {
	
	constructor(private appLinksService: DigitalCoinHubService, private coinsRateFromService: DataDisplayFromAPI) { }
	
	title = 'Digital Coins';

	public columnDefs: object[];
	public rowData: any[];
	
	objectKeys = Object.keys; // Get data from API through service 
    cryptos: any; // Get data from API through service
	
	coinsToDisplay = 'BTC,ETH,XMR,BTG,BCH,LTC,XRP,IOT,XVG,XRB,FCT,XLM,XZC,ZEC,DASH,ADA,TRX,DBC,EMB,MKR,FNC';
	
	links: DCHlinks[]; // create a new array in type of DCHlinks to get the data
  
	getLinks(): void {
		this.links = this.appLinksService.getLinksByCategory('digital-coins'); // the array above (links), gets the array with the data from the service
	}

	setGrid(): void {
		this.columnDefs = [
			{headerName: 'Coin', field: 'coin', width: 100},
			{headerName: 'Price (USD)', field: 'priceInUSD', width: 100},
			{
				headerName: '', 
				field: 'link',
				cellRenderer: (params: any) =>`<a href="${params.value}" target="_blank">${params.value}</a>`
			}
		];
	}
  
	ngOnInit() {
		this.getLinks();
		this.setGrid();
		this.coinsRateFromService.getPrices(this.coinsToDisplay)
			.subscribe(res => {
				this.cryptos = res;
				this.rowData = Object.keys(res).map((x, index) => (
					{
						coin: [x], 
						priceInUSD: res[x]["USD"],
						link: this.links[index].dchCoynSymbol === x ? this.links[index].dchLink: ''
					}));
			});
	}
}

