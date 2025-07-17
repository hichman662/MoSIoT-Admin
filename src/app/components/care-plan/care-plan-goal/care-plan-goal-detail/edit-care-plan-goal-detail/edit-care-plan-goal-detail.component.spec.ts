import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarePlanGoalDetailComponent } from './edit-care-plan-goal-detail.component';

describe('EditCarePlanGoalDetailComponent', () => {
  let component: EditCarePlanGoalDetailComponent;
  let fixture: ComponentFixture<EditCarePlanGoalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarePlanGoalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarePlanGoalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
