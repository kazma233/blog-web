import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { ArticleComponent } from './article/article.component';
import { MarkedPipe } from './marked.pipe';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArchiveComponent } from './archive/archive.component';
import { UserComponent } from './manage/user/user.component';
import { ArticleManageComponent } from './manage/article-manage/article-manage.component';
import { ManageComponent } from './manage/manage/manage.component';
import { CategoryManageComponent } from './manage/category-manage/category-manage.component';
import { CommentComponent } from './manage/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    MarkedPipe,
    ArticleDetailComponent,
    ArchiveComponent,
    UserComponent,
    ArticleManageComponent,
    ManageComponent,
    CategoryManageComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
