import { TestBed } from '@angular/core/testing';

import { AlphavantageApiService } from './alphavantage-api.service';

describe('AlphavantageApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlphavantageApiService = TestBed.get(AlphavantageApiService);
    expect(service).toBeTruthy();
  });
});
