import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStateDeviceComponent } from './edit-state-device.component';

describe('EditStateDeviceComponent', () => {
  let component: EditStateDeviceComponent;
  let fixture: ComponentFixture<EditStateDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStateDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStateDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
