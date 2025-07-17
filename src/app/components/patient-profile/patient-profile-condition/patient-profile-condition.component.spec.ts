import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileConditionComponent } from './patient-profile-condition.component';

describe('PatientProfileConditionComponent', () => {
  let component: PatientProfileConditionComponent;
  let fixture: ComponentFixture<PatientProfileConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
