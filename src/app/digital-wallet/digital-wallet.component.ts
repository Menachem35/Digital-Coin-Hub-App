import { Component, OnInit } from '@angular/core';

import { DCHlinks } from '../links'; //DCHlinks class 
import { DigitalCoinHubService } from '../digital-coin-hub.service';

@Component({
	selector: 'digital-wallet', 
	templateUrl:  './digital-wallet.component.html',
	styleUrls: ['./digital-wallet.component.css']
})

export class DigitalWalletComponent implements OnInit {
	
	constructor(private appLinksService: DigitalCoinHubService) {}
	
	links: DCHlinks[]; // create a new array in type of DCHlinks to get the data
	
	getLinks (): void {
		this.links = this.appLinksService.getLinksByCategory('digital-wallet');
	}
	
	ngOnInit () {
		this.getLinks ();
	}
	
}
