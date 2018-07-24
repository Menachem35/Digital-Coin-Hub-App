import { Component, OnInit } from '@angular/core';

import { DCHlinks } from '../links'; //DCHlinks class 
import { DigitalCoinHubService } from '../digital-coin-hub.service';

@Component({
	selector: 'buy-with',
	templateUrl: './buy-with.Component.html'
})

export class BuyWithDigitalCoinComponent {
	
	constructor(private appLinksService: DigitalCoinHubService) { }
	
	title = 'Stores that accept Bitcoin';
	
	links: DCHlinks[]; // create a new array in type of DCHlinks to get the data
  
	getLinks(): void {
		this.links = this.appLinksService.getLinksByCategory('buy-with'); // the array above (links), gets the array with the data from the service
	}
  
	ngOnInit() {
		this.getLinks();   
	}
}