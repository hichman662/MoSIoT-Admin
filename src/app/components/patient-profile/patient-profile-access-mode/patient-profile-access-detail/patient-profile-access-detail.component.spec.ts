import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileAccessDetailComponent } from './patient-profile-access-detail.component';

describe('PatientProfileAccessDetailComponent', () => {
  let component: PatientProfileAccessDetailComponent;
  let fixture: ComponentFixture<PatientProfileAccessDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileAccessDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileAccessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
