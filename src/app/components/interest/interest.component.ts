import { ContentService } from './../../services/content-service/content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {

  constructor(private _contentService: ContentService) { }

  ngOnInit() {
    this._contentService.getInterests().subscribe(interestsContent => {
      console.log(interestsContent);
    });
  }

}
