import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceTelemetryComponent } from './edit-device-telemetry.component';

describe('EditDeviceTelemetryComponent', () => {
  let component: EditDeviceTelemetryComponent;
  let fixture: ComponentFixture<EditDeviceTelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeviceTelemetryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeviceTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
