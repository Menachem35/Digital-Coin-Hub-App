import { Component, OnInit } from '@angular/core';

import { DCHlinks } from '../links'; //DCHlinks class 
import { DigitalCoinHubService } from '../digital-coin-hub.service';

@Component({
	selector: 'ethereum-section',
	templateUrl: './ethereum.component.html',
	styleUrls: ['./ethereum.component.css']
})

export class EthereumComponent implements OnInit {
	
	constructor(private appLinksService: DigitalCoinHubService) { }
	
	title = 'Ethereum';
	
	links: DCHlinks[]; // create a new array in type of DCHlinks to get the data
  
    getLinks(): void {
	   this.links = this.appLinksService.getLinksByCategory('Ethereum'); // the array above (links), gets the array with the data from the service
    }
  
    ngOnInit() {
	   this.getLinks();   
    }
}
