import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Result } from 'src/entity/common/result';
import { Tool } from 'src/tool/tool';
import { User } from 'src/entity/manage/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  loginUser: User = new User();

  constructor(private httpClient: HttpClient, private route: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.httpClient.post<Result<string>>(environment.baseURL + '/users/login', this.loginUser, {
      headers: Tool.getDefaultHeaders(),
    }).subscribe(result => {
      if (result.success) {
        localStorage.setItem(Tool.AUTH_NAME, result.result);
        this.route.navigateByUrl("/manage");
      }
    }, err => {
      console.log(err);
    });
  }

}
