import { Component, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import * as moment from 'moment';

import { BlogApiService } from '../../shared/services/blog-api.service';

@Component({
  selector: 'app-news-archive',
  templateUrl: './news-archive.component.html',
  styleUrls: ['./news-archive.component.scss']
})
export class NewsArchiveComponent implements OnInit {

  constructor(private blogApi: BlogApiService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public blogPosts: any[]; // Gets the blog's posts from API
  public postDate: string; // Display post's date

  displayedColumns: string[] = ['date', 'news'];

  dataSource: any;

  getBlogPosts(): void {
    this.blogApi.getDatafromBlog().subscribe(newsItems => {
      this.blogPosts = newsItems;
      this.blogPosts.forEach(data => data.date = moment(data.date).format("MMMM Do YYYY"));
      this.dataSource = new MatTableDataSource<any>(this.blogPosts);
      this.dataSource.paginator = this.paginator;
      //console.log( this.blogPosts);
    })
  }

  ngOnInit(): void {
    this.getBlogPosts();
  }

}
