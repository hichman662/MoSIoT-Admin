import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCareActivityAppoinmentsComponent } from './edit-care-activity-appoinments.component';

describe('EditCareActivityAppoinmentsComponent', () => {
  let component: EditCareActivityAppoinmentsComponent;
  let fixture: ComponentFixture<EditCareActivityAppoinmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCareActivityAppoinmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCareActivityAppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
