import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanAdapterComponent } from './care-plan-adapter.component';

describe('CarePlanAdapterComponent', () => {
  let component: CarePlanAdapterComponent;
  let fixture: ComponentFixture<CarePlanAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarePlanAdapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
