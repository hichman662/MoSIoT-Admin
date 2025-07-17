import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceProfileComponent } from './edit-device-profile.component';

describe('EditDeviceProfileComponent', () => {
  let component: EditDeviceProfileComponent;
  let fixture: ComponentFixture<EditDeviceProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeviceProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeviceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
