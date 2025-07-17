import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarePlanMeasureDetailsComponent } from './edit-care-plan-measure-details.component';

describe('EditCarePlanMeasureDetailsComponent', () => {
  let component: EditCarePlanMeasureDetailsComponent;
  let fixture: ComponentFixture<EditCarePlanMeasureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarePlanMeasureDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarePlanMeasureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
