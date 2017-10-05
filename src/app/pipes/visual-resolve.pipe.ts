import { VisualStatusService } from './../services/visual-status-service/visual-status.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'visualResolve'
})
export class VisualResolvePipe implements PipeTransform {

  constructor(private _visualService: VisualStatusService) {

  }
  transform(value: any, args?: any): any {
    // delay by 400ms to give transition time to animate
    setTimeout(() => this._visualService.setStateAsIdle(), 400)
    return value;
  }

}
