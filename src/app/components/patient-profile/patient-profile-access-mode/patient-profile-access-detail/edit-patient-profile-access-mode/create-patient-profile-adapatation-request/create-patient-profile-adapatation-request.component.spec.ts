import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePatientProfileAdapatationRequestComponent } from './create-patient-profile-adapatation-request.component';

describe('CreatePatientProfileAdapatationRequestComponent', () => {
  let component: CreatePatientProfileAdapatationRequestComponent;
  let fixture: ComponentFixture<CreatePatientProfileAdapatationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePatientProfileAdapatationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePatientProfileAdapatationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
