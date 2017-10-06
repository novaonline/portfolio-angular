import { VisualStatusService } from './../../services/visual-status-service/visual-status.service';
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
  private _defaultTopText: string = "GREETINGS, MY NAME IS";
  private _defaultBottomText: string = "EMMANUEL QUAGRAINE";
  public topText: string;
  public bottomText: string;

  constructor(private _visualStateService: VisualStatusService) {
    this._stateToCssClassMapping = this.getStateToCssClassMapping();
    this._stateToActionMapping = {};
    this.currentState = VisualStatusState.LOADING; // initial state
    this._stateToActionMapping[VisualStatusState.IDLE] = this.showIdle;
    this._stateToActionMapping[VisualStatusState.LOADING] = this.showLoading;
    this._stateToActionMapping[VisualStatusState.INTRO] = this.showIntro;
    this.topText = this._defaultTopText;
    this.bottomText = this._defaultBottomText;
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

  showIntro() : void {
    console.log("intro");
  }

  convertStateToClassClass(state: VisualStatusState): string {
    return this._stateToCssClassMapping[state];
  }

  getTopTextByCurrentState(state: VisualStatusState): string {
    switch (state) {
      case VisualStatusState.INTRO:
        return this._defaultTopText;
      default:
        return "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Loading...";
    }
  }


  getBottomTextByCurrentState(state: VisualStatusState): string {
    switch (state) {
      case VisualStatusState.INTRO:
        return this._defaultBottomText;
      default:
        return "Running on a free plan";
    }
  }

  private getStateToCssClassMapping(): { [id: number]: string } {
    let temp: { [id: number]: string } = {};
    temp[VisualStatusState.LOADING] = "loading";
    temp[VisualStatusState.IDLE] = "idle";
    temp[VisualStatusState.SUCCESS] = "success";
    temp[VisualStatusState.CRITICAL] = "critical";
    temp[VisualStatusState.FAILURE] = "failure";
    temp[VisualStatusState.INTRO] = "intro";
    return temp;
  }

}
