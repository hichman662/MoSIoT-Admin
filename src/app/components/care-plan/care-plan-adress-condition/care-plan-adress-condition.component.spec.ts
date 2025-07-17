import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanAdressConditionComponent } from './care-plan-adress-condition.component';

describe('CarePlanAdressConditionComponent', () => {
  let component: CarePlanAdressConditionComponent;
  let fixture: ComponentFixture<CarePlanAdressConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanAdressConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanAdressConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
