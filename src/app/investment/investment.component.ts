import { Component, OnInit } from '@angular/core';

import { DCHlinks } from '../links'; //DCHlinks class 
import { DigitalCoinHubService } from '../digital-coin-hub.service';

@Component({
	selector: 'investment',
	templateUrl: './investment.component.html',
	styleUrls: ['./investment.component.css']
})


export class InvestmentComponent implements OnInit {
	
	constructor(private appLinksService: DigitalCoinHubService) { }
	
	title = 'Investment';
	
	links: DCHlinks[]; // create a new array in type of DCHlinks to get the data
  
	getLinks(): void {
		this.links = this.appLinksService.getLinksByCategory('investment'); // the array above (links), gets the array with the data from the service
	}
  
	ngOnInit() {
		this.getLinks();   
	}
}