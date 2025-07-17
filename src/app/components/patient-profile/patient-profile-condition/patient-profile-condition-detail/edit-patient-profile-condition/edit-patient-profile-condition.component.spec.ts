import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientProfileConditionComponent } from './edit-patient-profile-condition.component';

describe('EditPatientProfileConditionComponent', () => {
  let component: EditPatientProfileConditionComponent;
  let fixture: ComponentFixture<EditPatientProfileConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientProfileConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientProfileConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
