import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { VisualStatusState } from './../../models/enums/visual-status-state.enum';

@Injectable()
export class VisualStatusService {

  private _state$: Subject<VisualStatusState>;

  constructor() {
    this._state$ = new Subject<VisualStatusState>();
    // TODO: When animations are in progress, we'd like to prevent things from interrupting
  }

  /**
   * Returns an observable object that an observer can subscribe to.
   *
   * @returns {Observable<VisualStatusState>}
   * @memberof VisualStatusService
   */
  public observeState(): Observable<VisualStatusState> {
    return this._state$.asObservable();
  }

  /**
   * Set's the current state of the 'Visual Status' component
   *
   * @param {VisualStatusState} state
   * @memberof VisualStatusService
   */
  public setState(state: VisualStatusState): void {
    this._state$.next(state);
  }

  /**
   * Alias for setState where VisualStatusState is LOADING
   *
   * @memberof VisualStatusService
   */
  public setStateAsLoading(): void {
    this.setState(VisualStatusState.LOADING);
  }

  /**
   * Alias for setState where VisualStatusState is IDLE
   *
   * @memberof VisualStatusService
   */
  public setStateAsIdle(): void {
    this.setState(VisualStatusState.IDLE);
  }

  /**
   * Alias for setState where VisualStatusState is INTRO
   *
   * @memberof VisualStatusService
   */
  public setStateAsIntro(): void {
    this.setState(VisualStatusState.INTRO);
  }


}
