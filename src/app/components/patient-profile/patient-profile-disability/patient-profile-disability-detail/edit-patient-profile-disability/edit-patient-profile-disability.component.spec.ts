import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientProfileDisabilityComponent } from './edit-patient-profile-disability.component';

describe('EditPatientProfileDisabilityComponent', () => {
  let component: EditPatientProfileDisabilityComponent;
  let fixture: ComponentFixture<EditPatientProfileDisabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientProfileDisabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientProfileDisabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
