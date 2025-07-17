import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileAdapterComponent } from './patient-profile-adapter.component';

describe('PatientProfileAdapterComponent', () => {
  let component: PatientProfileAdapterComponent;
  let fixture: ComponentFixture<PatientProfileAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileAdapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProfileAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
