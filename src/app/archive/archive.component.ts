import { Component, OnInit } from '@angular/core';
import { Archive } from 'src/entity/archive';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from 'src/entity/common/result';
import { ArchiveGroup } from 'src/entity/archive-group';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  archiveGroups: ArchiveGroup = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getArchive();
  }

  getArchive() {
    this.httpClient.get<Result<ArchiveGroup>>(environment.baseURL + '/articles/group', {
      withCredentials: true,
    }).subscribe(result => {
      this.archiveGroups = result.data;
    }, err => {
      console.log(err);
    });
  }
  
}
