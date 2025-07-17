import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientProfileAdaptationRequestComponent } from './edit-patient-profile-adaptation-request.component';

describe('EditPatientProfileAdaptationRequestComponent', () => {
  let component: EditPatientProfileAdaptationRequestComponent;
  let fixture: ComponentFixture<EditPatientProfileAdaptationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientProfileAdaptationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientProfileAdaptationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
