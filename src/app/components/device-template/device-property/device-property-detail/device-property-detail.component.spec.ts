import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePropertyDetailComponent } from './device-property-detail.component';

describe('DevicePropertyDetailComponent', () => {
  let component: DevicePropertyDetailComponent;
  let fixture: ComponentFixture<DevicePropertyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicePropertyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicePropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
