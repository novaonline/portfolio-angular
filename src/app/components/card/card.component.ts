import { Router, RoutesRecognized, NavigationEnd, NavigationStart } from '@angular/router';
import { VisualStatusService } from './../../services/visual-status-service/visual-status.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { VisualStatusState } from '../../models/enums/visual-status-state.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('visibleState', [
      state('hidden', style({
        visibility: 'visible',
        transform: 'scale(0)'
      })),
      state('visible', style({
        visibility: 'visible',
        transform: 'scale(1)'
      })),
      transition('hidden => visible', animate('250ms ease-in')),
      transition('visible => hidden', animate('250ms ease-out'))
    ])
  ]
})
export class CardComponent implements OnInit {

  public visibleState: string;

  constructor(private _visualStateService: VisualStatusService, private _router: Router) {
    this.visibleState = 'hidden';
    this._router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        this._visualStateService.setStateAsLoading();
      }
      if (evt instanceof NavigationEnd) {
        setTimeout(()=> this._visualStateService.setStateAsIdle(), 1000) // give it at lease one second to animate
        // todo: add text that says transitioning (not loading)
      }
    })
  }

  ngOnInit() {
    this._visualStateService.observeState().subscribe(state => {
      switch (state) {
        case VisualStatusState.LOADING:
          this.visibleState = 'hidden';
          break;
        case VisualStatusState.IDLE:
          this.visibleState = 'visible';
        default:
          break;
      }
    });
    setTimeout(() => {
      this._visualStateService.setStateAsIdle();
      // this.visibleState = 'visible';
      // setTimeout(() => {
      //   this._visualStateService.setStateAsLoading();
      //   this.visibleState = 'hidden';
      // }, 5000);
    }, 5000);

  }

}
