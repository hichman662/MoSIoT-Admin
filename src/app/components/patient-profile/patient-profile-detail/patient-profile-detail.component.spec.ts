import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileDetailComponent } from './patient-profile-detail.component';

describe('PatientProfileDetailComponent', () => {
  let component: PatientProfileDetailComponent;
  let fixture: ComponentFixture<PatientProfileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
