import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCareplanTargetComponent } from './create-careplan-target.component';

describe('CreateCareplanTargetComponent', () => {
  let component: CreateCareplanTargetComponent;
  let fixture: ComponentFixture<CreateCareplanTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCareplanTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCareplanTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
