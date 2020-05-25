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

  // Get news item from wordpress API
	public newsItem: any = {
		title: '',
    content: ''
	};

  /**
   * Get posts from wordpress API
   * @param numberOfPosts number of post to get from API
   */
  getDatafromBlog(numberOfPosts: number): Observable<any[]>{
      return this._http.get<any[]>(`http://digitalcoinhub.io/blog/wp-json/wp/v2/posts/?per_page=${numberOfPosts}`);
  }
}
