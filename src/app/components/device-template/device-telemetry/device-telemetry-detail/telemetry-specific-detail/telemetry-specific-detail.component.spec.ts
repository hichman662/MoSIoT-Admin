import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetrySpecificDetailComponent } from './telemetry-specific-detail.component';

describe('TelemetrySpecificDetailComponent', () => {
  let component: TelemetrySpecificDetailComponent;
  let fixture: ComponentFixture<TelemetrySpecificDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelemetrySpecificDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemetrySpecificDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
