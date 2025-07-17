import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanMeasureTelemetryComponent } from './care-plan-measure-telemetry.component';

describe('CarePlanMeasureTelemetryComponent', () => {
  let component: CarePlanMeasureTelemetryComponent;
  let fixture: ComponentFixture<CarePlanMeasureTelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanMeasureTelemetryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanMeasureTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
