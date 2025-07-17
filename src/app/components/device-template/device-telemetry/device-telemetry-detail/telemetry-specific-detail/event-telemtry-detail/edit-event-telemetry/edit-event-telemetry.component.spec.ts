import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventTelemetryComponent } from './edit-event-telemetry.component';

describe('EditEventTelemetryComponent', () => {
  let component: EditEventTelemetryComponent;
  let fixture: ComponentFixture<EditEventTelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventTelemetryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
