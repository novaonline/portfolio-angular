import { VisualStatusService } from './../../services/visual-status.service';
import { Component, OnInit } from '@angular/core';
import { VisualStatusState } from '../../models/enums/visual-status-state.enum';

@Component({
  selector: 'app-visual-status',
  templateUrl: './visual-status.component.html',
  styleUrls: ['./visual-status.component.scss']
})
export class VisualStatusComponent implements OnInit {

  private _stateToActionMapping: { [id: number]: Function };
  private _stateToCssClassMapping: { [id: number]: string };
  public currentState: VisualStatusState;

  constructor(private _visualStateService: VisualStatusService) {
    this._stateToCssClassMapping = this.getStateToCssClassMapping();
    this._stateToActionMapping = {};
    this.currentState = VisualStatusState.LOADING; // initial state
    this._stateToActionMapping[VisualStatusState.IDLE] = this.showIdle;
    this._stateToActionMapping[VisualStatusState.LOADING] = this.showLoading;
  }

  ngOnInit() {
    /* Setup observation */
    this._visualStateService.observeState().subscribe(state => {
      this.currentState = state;
      let action: Function = (() => { }); // just declaring an empty function
      let defaultAction: Function = this._stateToActionMapping[VisualStatusState.IDLE];
      action = this._stateToActionMapping[state] || defaultAction;
      action(); // execute
    });
  }

  /**
   * Alters properties and executes animation with a final state being 'Idle'
   *
   * @memberof VisualStatusComponent
   */
  showIdle(): void {
    /* pre condition: if it's already idle, dont run */
    console.log('idle');
  }

  /**
   * Alters properties and executes animation with a final state being 'Idle'
   *
   * @memberof VisualStatusComponent
   */
  showLoading(): void {
    console.log('loading');
  }

  convertStateToClassClass(state: VisualStatusState): string {
    return this._stateToCssClassMapping[state];
  }

  private getStateToCssClassMapping(): { [id: number]: string } {
    let temp: { [id: number]: string } = {};
    temp[VisualStatusState.LOADING] = "loading";
    temp[VisualStatusState.IDLE] = "idle";
    temp[VisualStatusState.SUCCESS] = "success";
    temp[VisualStatusState.CRITICAL] = "critical";
    temp[VisualStatusState.FAILURE] = "failure";
    return temp;
  }

}
