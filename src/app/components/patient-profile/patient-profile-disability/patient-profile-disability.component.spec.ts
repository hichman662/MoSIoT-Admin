import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileDisabilityComponent } from './patient-profile-disability.component';

describe('PatientProfileDisabilityComponent', () => {
  let component: PatientProfileDisabilityComponent;
  let fixture: ComponentFixture<PatientProfileDisabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileDisabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileDisabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
