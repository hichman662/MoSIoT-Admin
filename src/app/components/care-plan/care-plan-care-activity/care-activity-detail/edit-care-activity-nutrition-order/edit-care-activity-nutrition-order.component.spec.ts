import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCareActivityNutritionOrderComponent } from './edit-care-activity-nutrition-order.component';

describe('EditCareActivityNutritionOrderComponent', () => {
  let component: EditCareActivityNutritionOrderComponent;
  let fixture: ComponentFixture<EditCareActivityNutritionOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCareActivityNutritionOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCareActivityNutritionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
