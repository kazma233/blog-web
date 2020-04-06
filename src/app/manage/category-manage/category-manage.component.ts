import { Component, OnInit } from '@angular/core';
import { Category } from 'src/entity/manage/category';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/entity/common/result';
import { environment } from 'src/environments/environment';
import { Tool } from 'src/tool/tool';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss'],
})
export class CategoryManageComponent implements OnInit {
  categorys: Array<Category> = null;

  addCategoryEntity: Category = new Category();
  updateCategoryEntity: Category = new Category();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.httpClient
      .get<Result<Array<Category>>>(
        environment.baseURL + '/manages/categories',
        {
          headers: Tool.getDefaultHeaders(),
        }
      )
      .subscribe(
        (result) => {
          this.categorys = result.result;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addCategory() {
    this.httpClient
      .post<Result<string>>(
        environment.baseURL + '/manages/categories',
        this.addCategoryEntity,
        {
          headers: Tool.getDefaultHeaders(),
        }
      )
      .subscribe(
        (result) => {
          if (result.success) {
            this.getAllCategory();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  delCategory(id: string) {
    this.httpClient
      .delete<Result<string>>(
        environment.baseURL + '/manages/categories/' + id,
        {
          headers: Tool.getDefaultHeaders(),
        }
      )
      .subscribe(
        (result) => {
          if (result.success) {
            this.getAllCategory();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  showUpdate(entity: Category) {
    this.updateCategoryEntity = entity;
  }

  cancelUpdate() {
    this.updateCategoryEntity = new Category();
  }

  updateCategory() {
    this.httpClient
      .put<Result<string>>(
        environment.baseURL + '/manages/categories',
        this.updateCategoryEntity,
        {
          headers: Tool.getDefaultHeaders(),
        }
      )
      .subscribe(
        (result) => {
          if (result.success) {
            this.getAllCategory();
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.updateCategoryEntity = new Category();
        }
      );
  }
}
