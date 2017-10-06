import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Content } from './../../models/content/content';
import { Observable } from 'rxjs';
import { VisualStatusService } from './../../services/visual-status-service/visual-status.service';
import { ContentService } from './../../services/content-service/content.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public content$: Observable<Content>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _contentService: ContentService,
    private _visualService: VisualStatusService) {}

  ngOnInit() {
    // TODO use mapping instead of switch cases
    this.content$ = this._route.paramMap
      .switchMap((params: ParamMap) => {

        switch (params.get('content')) {
          case 'education': return this._contentService.getEducation();
          case 'contact': return this._contentService.getContact();
          case 'experience': return this._contentService.getExperience();
          case 'interest': return this._contentService.getInterests();
          case 'projects': return this._contentService.getProjects();
          default:
            return;
        }

      });
      this.content$.subscribe(c => {
        console.log(c);
        setTimeout(() => this._visualService.setStateAsIdle(), 400)
      });
  }

}
