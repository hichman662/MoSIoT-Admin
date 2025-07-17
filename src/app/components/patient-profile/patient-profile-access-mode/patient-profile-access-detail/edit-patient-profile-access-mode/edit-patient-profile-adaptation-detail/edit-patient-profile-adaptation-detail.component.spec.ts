import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientProfileAdaptationDetailComponent } from './edit-patient-profile-adaptation-detail.component';

describe('EditPatientProfileAdaptationDetailComponent', () => {
  let component: EditPatientProfileAdaptationDetailComponent;
  let fixture: ComponentFixture<EditPatientProfileAdaptationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientProfileAdaptationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientProfileAdaptationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
