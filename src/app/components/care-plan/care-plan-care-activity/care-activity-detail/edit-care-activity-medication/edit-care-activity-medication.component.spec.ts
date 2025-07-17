import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCareActivityMedicationComponent } from './edit-care-activity-medication.component';

describe('EditCareActivityMedicationComponent', () => {
  let component: EditCareActivityMedicationComponent;
  let fixture: ComponentFixture<EditCareActivityMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCareActivityMedicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCareActivityMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
