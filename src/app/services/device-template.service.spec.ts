import { TestBed } from '@angular/core/testing';

import { DeviceTemplateService } from './device-template.service';

describe('DeviceTemplateService', () => {
  let service: DeviceTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
