import { Component, OnInit } from '@angular/core';

import { DCHlinks } from '../links'; //DCHlinks class 
import { DigitalCoinHubService } from '../digital-coin-hub.service';

@Component ({
	selector: 'news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {
	
  constructor(private appLinksService: DigitalCoinHubService) { }
  
  title = "News and Blogs about Cryptocurrency";
  
  links: DCHlinks[]; // create a new array in type of DCHlinks to get the data
  blogsLinks: DCHlinks[];
  
  getLinks(): void {
	  this.links = this.appLinksService.getLinksByCategory('News'); // the array above (links), gets the array with the data from the service
	  this.blogsLinks = this.appLinksService.getLinksByCategory('Blogs');
  }
  
  ngOnInit() {
	this.getLinks();   
  }
}
