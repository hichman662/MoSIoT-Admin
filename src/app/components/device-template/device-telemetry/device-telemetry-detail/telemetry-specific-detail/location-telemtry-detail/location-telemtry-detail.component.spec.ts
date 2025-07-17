import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTelemtryDetailComponent } from './location-telemtry-detail.component';

describe('LocationTelemtryDetailComponent', () => {
  let component: LocationTelemtryDetailComponent;
  let fixture: ComponentFixture<LocationTelemtryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTelemtryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTelemtryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
