import { Component, OnInit } from '@angular/core';
import { Archive } from 'src/entity/archive';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from 'src/entity/common/result';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  textArchive: Map<String, Array<Archive>> = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getArchive();
  }

  getArchive() {
    this.httpClient.get<Result<Map<String, Array<Archive>>>>(environment.baseURL + '/articles/archive', {
      withCredentials: true,
    }).subscribe(result => {
      this.textArchive = result.result;
    }, err => {
      console.log(err);
    });
  }

  keys(): Array<String> {
    if (this.textArchive != null) {
      return Object.keys(this.textArchive);
    }
    return null;
  }
}
