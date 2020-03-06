import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlpacaApiService {

  constructor(/*private _http: HttpClient*/) { }
  
  /*let headers = new HttpClient({
	  "APCA-API-KEY-ID": "PKJF26ESOHJOUCBE5P6H",
	  "APCA-API-SECRET-KEY": "36YZ1V0t73wF4XMfixWFKjLVgzTnaFPFncL2/Ayy"
  });*/
  
  //let url: string = "https://paper-api.alpaca.markets";
  //let url: string = "api.alpaca.markets";
  
  /*getData(): Observable<any[]> {
	  this._http.get<any>(url, headers);
  }*/
}
