import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTemplateAdapterComponent } from './device-template-adapter.component';

describe('DeviceTemplateAdapterComponent', () => {
  let component: DeviceTemplateAdapterComponent;
  let fixture: ComponentFixture<DeviceTemplateAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTemplateAdapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTemplateAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
