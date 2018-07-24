import { Injectable } from '@angular/core';

import { DCHlinks } from './links'; //DCHlinks class 
import { APP_LINKS } from './mock-app-links'; // the links array


@Injectable()
export class DigitalCoinHubService {

	constructor() {}
	
	getLinks (): DCHlinks[] {
		return APP_LINKS; //return whe whole array
	}
	
	getLinksByCategory(linksCategory: string): DCHlinks[] {
		return APP_LINKS.filter(t=>t.dchCategory == linksCategory); //filter the array and return the links of the requested category
	}
}
