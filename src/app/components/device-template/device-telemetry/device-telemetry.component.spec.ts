import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTelemetryComponent } from './device-telemetry.component';

describe('DeviceTelemetryComponent', () => {
  let component: DeviceTelemetryComponent;
  let fixture: ComponentFixture<DeviceTelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTelemetryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
