import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateTelemetryDetailComponent } from './state-telemetry-detail.component';

describe('StateTelemetryDetailComponent', () => {
  let component: StateTelemetryDetailComponent;
  let fixture: ComponentFixture<StateTelemetryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateTelemetryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateTelemetryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
