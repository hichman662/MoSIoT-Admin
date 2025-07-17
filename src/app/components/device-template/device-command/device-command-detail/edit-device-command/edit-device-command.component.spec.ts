import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceCommandComponent } from './edit-device-command.component';

describe('EditDeviceCommandComponent', () => {
  let component: EditDeviceCommandComponent;
  let fixture: ComponentFixture<EditDeviceCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeviceCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeviceCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
