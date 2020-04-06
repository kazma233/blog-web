import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Page } from 'src/entity/common/page';
import { Result } from 'src/entity/common/result';
import { Article } from 'src/entity/article';
import { Tool } from 'src/tool/tool';
import { ArticleQuery } from 'src/entity/query/article.query';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  pageKey = "PAGE";
  articleQuery: ArticleQuery = new ArticleQuery();

  articleDate: Page<Article> = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.articleQuery.pageNo = 1;
    this.getAticle();
  }

  getAticle() {
    this.httpClient.get<Result<Page<Article>>>(environment.baseURL + "/articles", {
      withCredentials: true,
      params: this.articleQuery.toHttpParams()
    }).subscribe(result => {
      this.articleDate = result.result;
    }, err => {
      console.log(err);
    });
  }

  pageUp() {
    this.articleQuery.pageNo = this.articleQuery.pageNo - 1;
    this.setPage();
    this.getAticle();
  }

  pageDown() {
    this.articleQuery.pageNo = this.articleQuery.pageNo + 1;
    this.setPage();
    this.getAticle();
  }

  getPage(): number {
    const pageStr = localStorage.getItem(this.pageKey)
    if (!Tool.checkNotEmpty(pageStr)) {
      return 1;
    }
    return +pageStr;
  }

  setPage() {
    localStorage.setItem(this.pageKey, this.articleQuery.pageNo.toString());
  }

}
