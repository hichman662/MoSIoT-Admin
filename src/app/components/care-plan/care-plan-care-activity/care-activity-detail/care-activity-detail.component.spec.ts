import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareActivityDetailComponent } from './care-activity-detail.component';

describe('CareActivityDetailComponent', () => {
  let component: CareActivityDetailComponent;
  let fixture: ComponentFixture<CareActivityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareActivityDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
