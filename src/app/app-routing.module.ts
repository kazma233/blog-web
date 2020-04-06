import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArchiveComponent } from './archive/archive.component';
import { UserComponent } from './manage/user/user.component';
import { ArticleManageComponent } from './manage/article-manage/article-manage.component';
import { ManageComponent } from './manage/manage/manage.component';
import { CategoryManageComponent } from './manage/category-manage/category-manage.component';
import { CommentComponent } from './manage/comment/comment.component';


const routes: Routes = [
  { path: "", component: ArticleComponent },
  { path: "article/:id", component: ArticleDetailComponent },
  { path: "archive", component: ArchiveComponent },
  { path: "user", component: UserComponent },
  {
    path: "manage", component: ManageComponent, children: [
      { path: "", pathMatch: "full", redirectTo: "/manage/article" },
      { path: "article", component: ArticleManageComponent },
      { path: "category", component: CategoryManageComponent },
      { path: "comment", component: CommentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
