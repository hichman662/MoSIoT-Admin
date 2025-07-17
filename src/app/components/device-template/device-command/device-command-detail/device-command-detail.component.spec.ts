import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCommandDetailComponent } from './device-command-detail.component';

describe('DeviceCommandDetailComponent', () => {
  let component: DeviceCommandDetailComponent;
  let fixture: ComponentFixture<DeviceCommandDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCommandDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCommandDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
