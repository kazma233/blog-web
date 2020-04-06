import { Component, OnInit } from '@angular/core';
import { Category } from 'src/entity/manage/category';
import { Article } from 'src/entity/article';
import { Page } from 'src/entity/common/page';
import { ArticleQuery } from 'src/entity/manage/query/articly.query';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from 'src/entity/common/result';
import { Tool } from 'src/tool/tool';

@Component({
  selector: 'app-article-manage',
  templateUrl: './article-manage.component.html',
  styleUrls: ['./article-manage.component.scss']
})
export class ArticleManageComponent implements OnInit {

  categorys: Array<Category> = [];

  articlePage: Page<Article> = new Page();
  articleQuery: ArticleQuery = new ArticleQuery();

  newArticle: Article = null;

  updateArticleEntity: Article = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.articleQuery.pageNo = 1;
    this.getArticles();
    this.getAllCategory();
  }

  getArticles() {
    this.httpClient.get<Result<Page<Article>>>(environment.baseURL + '/manages/articles', {
      headers: Tool.getDefaultHeaders(),
      params: this.articleQuery.toHttpParams()
    }).subscribe(result => {
      this.articlePage = result.result;
    }, err => {
      console.log(err);
    });
  }

  getAllCategory() {
    this.httpClient.get<Result<Array<Category>>>(environment.baseURL + "/manages/categories", {
      headers: Tool.getDefaultHeaders(),
    }).subscribe(result => {
      this.categorys = result.result;
    }, err => {
      console.log(err);
    })
  }

  showAddPop() {
    this.newArticle = new Article();
  }

  addArticle() {
    this.httpClient.post<Result<string>>(environment.baseURL + '/manages/articles', this.newArticle, {
      headers: Tool.getDefaultHeaders(),
    }).subscribe(result => {
      this.getArticles();
    }, err => {
      console.log(err);
    }, () => {
      this.newArticle = null;
    });
  }

  showUpdate(id: string) {
    this.httpClient.get<Result<Article>>(environment.baseURL + '/articles/' + id, {
      headers: Tool.getDefaultHeaders(),
    }).subscribe(result => {
      this.updateArticleEntity = result.result;
    }, err => {
      console.log(err);
    });
  }

  updateArticle() {
    this.httpClient.put<Result<string>>(environment.baseURL + '/manages/articles', this.updateArticleEntity, {
      headers: Tool.getDefaultHeaders(),
    }).subscribe(result => {
      this.getArticles()
    }, err => {
      console.log(err);
    }, () => {
      this.updateArticleEntity = null;
    });
  }

  deleteArticle(id: string) {
    this.httpClient.delete<Result<string>>(environment.baseURL + '/manages/articles/' + id, {
      headers: Tool.getDefaultHeaders(),
    }).subscribe(result => {
      this.getArticles();
    }, err => {
      console.log(err);
    });
  }

  pageUp() {
    this.articleQuery.pageNo = this.articleQuery.pageNo - 1;
    this.getArticles();
  }

  pageDown() {
    this.articleQuery.pageNo = this.articleQuery.pageNo + 1;
    this.getArticles();
  }

}
