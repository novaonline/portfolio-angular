import { VisualStatusService } from './../../services/visual-status-service/visual-status.service';
import { ContentService } from './../../services/content-service/content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private _contentService: ContentService, private _visualService: VisualStatusService) { }

  ngOnInit() {
    this._contentService.getContact().subscribe(contactContent => {
      console.log(contactContent);
      // load content here
      this._visualService.setStateAsIdle();
    });
  }

}
