import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanMeasureDetailsComponent } from './care-plan-measure-details.component';

describe('CarePlanMeasureDetailsComponent', () => {
  let component: CarePlanMeasureDetailsComponent;
  let fixture: ComponentFixture<CarePlanMeasureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanMeasureDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanMeasureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
