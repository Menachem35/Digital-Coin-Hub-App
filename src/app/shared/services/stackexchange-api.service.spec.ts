import { TestBed } from '@angular/core/testing';

import { StackexchangeApiService } from './stackexchange-api.service';

describe('StackexchangeApiService', () => {
  let service: StackexchangeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackexchangeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
