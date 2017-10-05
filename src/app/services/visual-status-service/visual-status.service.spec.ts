import { TestBed, inject } from '@angular/core/testing';

import { VisualStatusService } from './visual-status.service';

describe('VisualStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualStatusService]
    });
  });

  it('should be created', inject([VisualStatusService], (service: VisualStatusService) => {
    expect(service).toBeTruthy();
  }));
});
