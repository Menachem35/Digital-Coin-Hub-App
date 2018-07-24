import { Component, OnInit } from '@angular/core';

import { DCHlinks } from '../links'; //DCHlinks class 
import { DigitalCoinHubService } from '../digital-coin-hub.service';

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.css']
})
export class MiningComponent implements OnInit {

  constructor(private appLinksService: DigitalCoinHubService) { }
  
  title = "Mining";
  
  links: DCHlinks[]; // create a new array in type of DCHlinks to get the data
  
  getLinks(): void {
	  this.links = this.appLinksService.getLinksByCategory('mining'); // the array above (links), gets the array with the data from the service
  }
  
  ngOnInit() {
	this.getLinks();   
  }

}
