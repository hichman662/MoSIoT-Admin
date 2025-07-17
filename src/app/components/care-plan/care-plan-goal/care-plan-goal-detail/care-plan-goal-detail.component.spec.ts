import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanGoalDetailComponent } from './care-plan-goal-detail.component';

describe('CarePlanGoalDetailComponent', () => {
  let component: CarePlanGoalDetailComponent;
  let fixture: ComponentFixture<CarePlanGoalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanGoalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanGoalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
