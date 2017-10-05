import { VisualStatusService } from './../../services/visual-status-service/visual-status.service';
import { ContentService } from './../../services/content-service/content.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  constructor(private _contentService: ContentService, private _visualService: VisualStatusService) { }

  ngOnInit() {
    this._contentService.getEducation().subscribe(educationContent => {
      console.log(educationContent);
      this._visualService.setStateAsIdle();
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }

      });
  }

}
