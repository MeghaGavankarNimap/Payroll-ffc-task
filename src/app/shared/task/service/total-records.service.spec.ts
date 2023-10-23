import { TestBed } from '@angular/core/testing';

import { TotalRecordsService } from './total-records.service';

describe('TotalRecordsService', () => {
  let service: TotalRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
