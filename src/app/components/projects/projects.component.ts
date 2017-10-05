import { ContentService } from './../../services/content-service/content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private _contentService: ContentService) { }

  ngOnInit() {
    this._contentService.getProjects().subscribe(projectsContent => {
      console.log(projectsContent);
    });
  }

}
