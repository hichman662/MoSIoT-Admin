import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileAccessModeComponent } from './patient-profile-access-mode.component';

describe('PatientProfileAccessModeComponent', () => {
  let component: PatientProfileAccessModeComponent;
  let fixture: ComponentFixture<PatientProfileAccessModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileAccessModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileAccessModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
