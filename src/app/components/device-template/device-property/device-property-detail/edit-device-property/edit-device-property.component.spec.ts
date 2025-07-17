import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDevicePropertyComponent } from './edit-device-property.component';

describe('EditDevicePropertyComponent', () => {
  let component: EditDevicePropertyComponent;
  let fixture: ComponentFixture<EditDevicePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDevicePropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDevicePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
