import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePatientProfileAdaptationDetailComponent } from './create-patient-profile-adaptation-detail.component';

describe('CreatePatientProfileAdaptationDetailComponent', () => {
  let component: CreatePatientProfileAdaptationDetailComponent;
  let fixture: ComponentFixture<CreatePatientProfileAdaptationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePatientProfileAdaptationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePatientProfileAdaptationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
