import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanGoalComponent } from './care-plan-goal.component';

describe('CarePlanGoalComponent', () => {
  let component: CarePlanGoalComponent;
  let fixture: ComponentFixture<CarePlanGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
