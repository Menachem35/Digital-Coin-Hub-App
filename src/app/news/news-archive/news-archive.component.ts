import { Component, OnInit } from '@angular/core';

import { BlogApiService } from '../../shared/services/blog-api.service';

@Component({
  selector: 'app-news-archive',
  templateUrl: './news-archive.component.html',
  styleUrls: ['./news-archive.component.scss']
})
export class NewsArchiveComponent implements OnInit {

  constructor(private blogApi: BlogApiService) { }

  public blogPosts: any[]; // Gets the blog's posts from API

  getBlogPosts(): void {
    this.blogApi.getDatafromBlog().subscribe(newsItems => {
      this.blogPosts = newsItems;
      //console.log( this.blogPosts);
    })
  }

  ngOnInit(): void {
    this.getBlogPosts();
  }

}
