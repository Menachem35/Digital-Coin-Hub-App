/**
 * Get latest blog posts from wordpress website
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  constructor(private _http: HttpClient) { }

  getDatafromBlog(): Observable<any[]>{
      return this._http.get<any[]>('http://www.technpens.com/wp-json/wp/v2/posts/');
  }
}
