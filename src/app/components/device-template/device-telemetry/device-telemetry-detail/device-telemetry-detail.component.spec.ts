import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTelemetryDetailComponent } from './device-telemetry-detail.component';

describe('DeviceTelemetryDetailComponent', () => {
  let component: DeviceTelemetryDetailComponent;
  let fixture: ComponentFixture<DeviceTelemetryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTelemetryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTelemetryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
