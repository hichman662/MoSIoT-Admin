import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationTelemetryComponent } from './edit-location-telemetry.component';

describe('EditLocationTelemetryComponent', () => {
  let component: EditLocationTelemetryComponent;
  let fixture: ComponentFixture<EditLocationTelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLocationTelemetryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLocationTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
