import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarePlanDetailsComponent } from './edit-care-plan-details.component';

describe('EditCarePlanDetailsComponent', () => {
  let component: EditCarePlanDetailsComponent;
  let fixture: ComponentFixture<EditCarePlanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarePlanDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarePlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
