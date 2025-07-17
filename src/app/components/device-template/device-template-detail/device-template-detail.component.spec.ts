import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTemplateDetailComponent } from './device-template-detail.component';

describe('DeviceTemplateDetailComponent', () => {
  let component: DeviceTemplateDetailComponent;
  let fixture: ComponentFixture<DeviceTemplateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTemplateDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTemplateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
