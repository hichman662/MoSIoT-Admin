import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCareActivityDetailComponent } from './edit-care-activity-detail.component';

describe('EditCareActivityDetailComponent', () => {
  let component: EditCareActivityDetailComponent;
  let fixture: ComponentFixture<EditCareActivityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCareActivityDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCareActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
