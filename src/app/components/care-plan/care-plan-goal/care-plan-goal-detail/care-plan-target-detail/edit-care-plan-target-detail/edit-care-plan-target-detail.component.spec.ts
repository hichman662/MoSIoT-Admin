import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarePlanTargetDetailComponent } from './edit-care-plan-target-detail.component';

describe('EditCarePlanTargetDetailComponent', () => {
  let component: EditCarePlanTargetDetailComponent;
  let fixture: ComponentFixture<EditCarePlanTargetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarePlanTargetDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarePlanTargetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
