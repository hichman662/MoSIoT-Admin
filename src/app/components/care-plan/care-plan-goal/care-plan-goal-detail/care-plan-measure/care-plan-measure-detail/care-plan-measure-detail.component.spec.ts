import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanMeasureDetailComponent } from './care-plan-measure-detail.component';

describe('CarePlanMeasureDetailComponent', () => {
  let component: CarePlanMeasureDetailComponent;
  let fixture: ComponentFixture<CarePlanMeasureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanMeasureDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanMeasureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
