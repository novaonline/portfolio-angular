import { ContentService } from './../../services/content-service/content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  constructor(private _contentService: ContentService) { }

  ngOnInit() {
    this._contentService.getExperience().subscribe(experienceContent => {
      console.log(experienceContent);
    });
  }

}
