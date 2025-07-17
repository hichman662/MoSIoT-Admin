import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStateDeviceComponent } from './create-state-device.component';

describe('CreateStateDeviceComponent', () => {
  let component: CreateStateDeviceComponent;
  let fixture: ComponentFixture<CreateStateDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStateDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStateDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
