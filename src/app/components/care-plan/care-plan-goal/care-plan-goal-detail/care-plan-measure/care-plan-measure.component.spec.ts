import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanMeasureComponent } from './care-plan-measure.component';

describe('CarePlanMeasureComponent', () => {
  let component: CarePlanMeasureComponent;
  let fixture: ComponentFixture<CarePlanMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanMeasureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
