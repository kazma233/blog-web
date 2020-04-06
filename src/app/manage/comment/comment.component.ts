import { Component, OnInit } from '@angular/core';
import { Page } from 'src/entity/common/page';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from 'src/entity/common/result';
import { Tool } from 'src/tool/tool';
import { Comment } from 'src/entity/manage/comment';
import { CommentQuery } from 'src/entity/manage/query/comment.query';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  commentQuery: CommentQuery = new CommentQuery();

  commentPage: Page<Comment> = new Page();

  constructor(private httpClient: HttpClient) { }
  
  ngOnInit() {
    this.getAllComment();
  }

  getAllComment() {
    this.httpClient.get<Result<Page<Comment>>>(environment.baseURL + '/manages/comments', {
      headers: Tool.getDefaultHeaders(),
      params: this.commentQuery.toHttpParams()
    }).subscribe(result => {
      this.commentPage = result.result;
    }, err => {
      console.log(err);
    });
  }

  updateCommentStatus(comment: Comment) {
    if (comment.status == 'SHOW') {
      comment.status = 'HIDDEN';
    } else {
      comment.status = 'SHOW';
    }

    this.httpClient.patch<Result<string>>(environment.baseURL + '/manages/comments/', comment, {
      headers: Tool.getDefaultHeaders(),
    }).subscribe(result => {
      this.getAllComment();
    }, err => {
      console.log(err);
    });
  }

  pageUp() {
    this.commentQuery.pageNo -= 1
    this.getAllComment();
  }

  pageDown() {
    this.commentQuery.pageNo += 1
    this.getAllComment();
  }

}
