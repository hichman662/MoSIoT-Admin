import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorTelemtryDetailComponent } from './sensor-telemtry-detail.component';

describe('SensorTelemtryDetailComponent', () => {
  let component: SensorTelemtryDetailComponent;
  let fixture: ComponentFixture<SensorTelemtryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorTelemtryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorTelemtryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
