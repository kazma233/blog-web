import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/entity/common/result';
import { Article } from 'src/entity/article';
import { environment } from 'src/environments/environment';
import { Page } from 'src/entity/common/page';
import { Comment } from 'src/entity/manage/comment';

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

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getArticleDetail();
  }


  // 获取文章详情
  getArticleDetail() {
    this.httpClient.get<Result<Article>>(environment.baseURL + '/articles/' + this.id, {
      withCredentials: true
    }).subscribe(result => {
      this.article = result.data;
      this.setPicShow();
    }, err => {
      console.log(err);
    });
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
