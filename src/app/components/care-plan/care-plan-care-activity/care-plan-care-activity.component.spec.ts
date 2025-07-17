import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanCareActivityComponent } from './care-plan-care-activity.component';

describe('CarePlanCareActivityComponent', () => {
  let component: CarePlanCareActivityComponent;
  let fixture: ComponentFixture<CarePlanCareActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanCareActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanCareActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
