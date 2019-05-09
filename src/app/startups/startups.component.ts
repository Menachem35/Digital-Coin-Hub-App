import { Component, OnInit } from '@angular/core';

import { DCHlinks } from '../links'; //DCHlinks class 
import { DigitalCoinHubService } from '../digital-coin-hub.service';

@Component({
	selector: 'startups',
	templateUrl: './startups.component.html',
	styleUrls: ['./startups.component.scss']
})

export class StartupsComponent implements OnInit {
	
	constructor(private appLinksService: DigitalCoinHubService) { }
	
	title = 'Startups and ICO';
	
	links: DCHlinks[]; // create a new array in type of DCHlinks to get the data 
	icoLinks: DCHlinks[]; // create a new array in type of DCHlinks to get the data for the ICO category
	
	getLinks(): void {
	  this.links = this.appLinksService.getLinksByCategory('startups'); // the array above (links), gets the array with the data from the service 
	  this.icoLinks = this.appLinksService.getLinksByCategory('ICO'); // get the ICO links   
	}
	
	ngOnInit() {
		this.getLinks();
	}
}