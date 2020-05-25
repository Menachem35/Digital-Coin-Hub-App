import { Component, OnInit } from '@angular/core';
import { BlogApiService } from '../../shared/services/blog-api.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private blogApi: BlogApiService
  ) { }

  public postContent: any = {
    title: '',
    content:''
  };

  ngOnInit(): void {
    // If accessing the link direct (without routing from main)
    if (!this.blogApi.newsItem.title) {
      console.log('Direct link');
      let post: any;
      this.blogApi.getDatafromBlog().subscribe(data => {
        post = data.filter(x => x.slug === this.route.snapshot.paramMap.get('id'));
        this.postContent.title = post[0].title.rendered;
        this.postContent.content = post[0].content.rendered;
      });
    }
    this.postContent.title = this.blogApi.newsItem.title;
    this.postContent.content = this.blogApi.newsItem.content;
    console.log(this.route.snapshot.paramMap.get('id'));
  }

}
