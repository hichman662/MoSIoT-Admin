import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSensorTelemetryComponent } from './edit-sensor-telemetry.component';

describe('EditSensorTelemetryComponent', () => {
  let component: EditSensorTelemetryComponent;
  let fixture: ComponentFixture<EditSensorTelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSensorTelemetryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSensorTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
