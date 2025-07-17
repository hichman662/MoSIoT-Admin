import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTelemtryDetailComponent } from './event-telemtry-detail.component';

describe('EventTelemtryDetailComponent', () => {
  let component: EventTelemtryDetailComponent;
  let fixture: ComponentFixture<EventTelemtryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTelemtryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTelemtryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
