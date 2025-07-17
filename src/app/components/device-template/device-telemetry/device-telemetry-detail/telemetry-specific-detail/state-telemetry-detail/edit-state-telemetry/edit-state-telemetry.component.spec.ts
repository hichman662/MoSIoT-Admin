import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStateTelemetryComponent } from './edit-state-telemetry.component';

describe('EditStateTelemetryComponent', () => {
  let component: EditStateTelemetryComponent;
  let fixture: ComponentFixture<EditStateTelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStateTelemetryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStateTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
