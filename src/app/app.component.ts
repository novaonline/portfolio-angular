import { VisualStatusService } from './services/visual-status.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = `Hello, I'm Emmanuel Quagraine`;

  constructor(private _visualStateService: VisualStatusService) { }

  ngOnInit(): void {
    // fake loading
    setTimeout(() => {
      this._visualStateService.setStateAsIdle();
    }, 5000)
  }
}
