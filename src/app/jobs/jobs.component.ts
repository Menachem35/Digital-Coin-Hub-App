import { Component, OnInit } from '@angular/core';

import { DCHlinks } from '../links'; //DCHlinks class 
import { DigitalCoinHubService } from '../digital-coin-hub.service';

@Component ({
	selector: 'jobs',
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss']
})

export class JobsComponent implements OnInit {
	
	constructor(private appLinksService: DigitalCoinHubService) { }
	
	title = 'Jobs';
	
	links: DCHlinks[]; // create a new array in type of DCHlinks to get the data
  
    getLinks(): void {
		this.links = this.appLinksService.getLinksByCategory('jobs'); // the array above (links), gets the array with the data from the service
    }
  
	ngOnInit() {
		this.getLinks();   
	}
}
