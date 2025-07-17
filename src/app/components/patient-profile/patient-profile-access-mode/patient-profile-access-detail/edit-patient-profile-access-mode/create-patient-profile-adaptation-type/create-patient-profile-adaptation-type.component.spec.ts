import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePatientProfileAdaptationTypeComponent } from './create-patient-profile-adaptation-type.component';

describe('CreatePatientProfileAdaptationTypeComponent', () => {
  let component: CreatePatientProfileAdaptationTypeComponent;
  let fixture: ComponentFixture<CreatePatientProfileAdaptationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePatientProfileAdaptationTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePatientProfileAdaptationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
