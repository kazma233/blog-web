import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/entity/common/result';
import { Article } from 'src/entity/article';
import { environment } from 'src/environments/environment';
import { Page } from 'src/entity/common/page';
import { Comment } from 'src/entity/manage/comment';
import { CommentQuery } from 'src/entity/query/comment.query';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  // 文章id
  id: string;

  // 文章详情
  article: Article = null;

  // 评论
  comment: Comment = new Comment();

  // 评论
  commentpage: Page<Comment> = null;

  // 查询参数
  commentQuery: CommentQuery = new CommentQuery();

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.commentQuery.articleId = this.id;
    this.getArticleDetail();
  }


  // 获取文章详情
  getArticleDetail() {
    this.httpClient.get<Result<Article>>(environment.baseURL + '/articles/' + this.id, {
      withCredentials: true
    }).subscribe(result => {
      this.article = result.result;
      this.setPicShow();
      this.getComment();
    }, err => {
      console.log(err);
    });
  }


  // 提交评论
  submitComment() {
    this.comment.articleId = this.id;
    this.httpClient.post<Result<string>>(environment.baseURL + '/comments', this.comment, {
      withCredentials: true
    }).subscribe(reuslt => {
      this.getComment();
      this.comment = new Comment();
    }, err => {
      console.log(err);
    });
  }


  getComment() {
    this.httpClient.get<Result<Page<Comment>>>(environment.baseURL + '/comments', {
      withCredentials: true,
      params: {
        'articleId': this.commentQuery.articleId,
        'pageNo': this.commentQuery.pageNo.toString()
      }
    }).subscribe(result => {
      this.commentpage = result.result;
    }, err => {
      console.log(err);
    });
  }

  pageUp() {
    this.commentQuery.pageNo = this.commentQuery.pageNo - 1;
    this.getComment();
  }

  pageDown() {
    this.commentQuery.pageNo = this.commentQuery.pageNo + 1;
    this.getComment();
  }

  setPicShow() {
    setTimeout(() => {
      const imgs = this.elementRef.nativeElement.querySelectorAll("img");
      imgs.forEach(img => {
        this.renderer.listen(img, "click", (event) => {
          window.open(event.target.src, "_blank")
        });
      });
    }, 100);
  }


}
