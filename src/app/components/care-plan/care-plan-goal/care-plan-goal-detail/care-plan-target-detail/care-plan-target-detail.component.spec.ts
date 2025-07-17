import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanTargetDetailComponent } from './care-plan-target-detail.component';

describe('CarePlanTargetDetailComponent', () => {
  let component: CarePlanTargetDetailComponent;
  let fixture: ComponentFixture<CarePlanTargetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanTargetDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanTargetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
