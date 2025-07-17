import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientProfileAdaptationTypeComponent } from './edit-patient-profile-adaptation-type.component';

describe('EditPatientProfileAdaptationTypeComponent', () => {
  let component: EditPatientProfileAdaptationTypeComponent;
  let fixture: ComponentFixture<EditPatientProfileAdaptationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientProfileAdaptationTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientProfileAdaptationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
