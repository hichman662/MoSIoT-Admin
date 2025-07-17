import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileConditionDetailComponent } from './patient-profile-condition-detail.component';

describe('PatientProfileConditionDetailComponent', () => {
  let component: PatientProfileConditionDetailComponent;
  let fixture: ComponentFixture<PatientProfileConditionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileConditionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileConditionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
