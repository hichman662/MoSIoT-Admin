import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileDisabilityDetailComponent } from './patient-profile-disability-detail.component';

describe('PatientProfileDisabilityDetailComponent', () => {
  let component: PatientProfileDisabilityDetailComponent;
  let fixture: ComponentFixture<PatientProfileDisabilityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileDisabilityDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileDisabilityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
