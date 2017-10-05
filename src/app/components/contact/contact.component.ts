import { ContentService } from './../../services/content-service/content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private _contentService: ContentService) { }

  ngOnInit() {
    this._contentService.getContact().subscribe(contactContent => {
      console.log(contactContent);
    });
  }

}
