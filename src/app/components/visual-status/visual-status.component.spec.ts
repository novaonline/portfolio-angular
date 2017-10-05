import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualStatusComponent } from './visual-status.component';

describe('VisualStatusComponent', () => {
  let component: VisualStatusComponent;
  let fixture: ComponentFixture<VisualStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
