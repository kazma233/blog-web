import { Component, OnInit } from '@angular/core';
import { Category } from 'src/entity/manage/category';
import { Article } from 'src/entity/article';
import { Page } from 'src/entity/common/page';
import { ArticleQuery } from 'src/entity/manage/query/articly.query';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from 'src/entity/common/result';
import { ArticleUpdate } from 'src/entity/article-update';
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

  updateArticleEntity: ArticleUpdate = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.articleQuery.pageNo = 1;
    this.getArticles();
  }

  getArticles() {
    this.httpClient.get<Result<Page<Article>>>(environment.baseURL + '/manage/articles', {
      headers: Tool.getDefaultHeaders(),
      params: this.articleQuery.toHttpParams()
    }).subscribe(result => {
      this.articlePage = result.data;
    }, err => {
      console.log(err);
    });
  }

  showAddPop() {
    this.newArticle = new Article();
  }

  addArticle() {
    this.httpClient.post<Result<string>>(environment.baseURL + '/manage/articles', this.newArticle, {
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
      let data = result.data;
      this.updateArticleEntity = new ArticleUpdate();
      this.updateArticleEntity.id = data.id;
      this.updateArticleEntity.status = data.status;
      this.updateArticleEntity.subTitle = data.subTitle;
      this.updateArticleEntity.tags = data.tags.join(",");
      this.updateArticleEntity.title = data.title;
      this.updateArticleEntity.content = data.content;
      this.updateArticleEntity.category = data.category;
    }, err => {
      console.log(err);
    });
  }

  updateArticle() {
    this.httpClient.put<Result<string>>(environment.baseURL + '/manage/articles', this.updateArticleEntity, {
      headers: Tool.getDefaultHeaders(),
    }).subscribe(result => {
      this.getArticles()
    }, err => {
      console.log(err);
    }, () => {
      this.updateArticleEntity = null;
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
