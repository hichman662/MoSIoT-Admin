import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientProfileAccessModeComponent } from './edit-patient-profile-access-mode.component';

describe('EditPatientProfileAccessModeComponent', () => {
  let component: EditPatientProfileAccessModeComponent;
  let fixture: ComponentFixture<EditPatientProfileAccessModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientProfileAccessModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientProfileAccessModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
