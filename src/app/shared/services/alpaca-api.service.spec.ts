import { TestBed } from '@angular/core/testing';

import { AlpacaApiService } from './alpaca-api.service';

describe('AlpacaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlpacaApiService = TestBed.get(AlpacaApiService);
    expect(service).toBeTruthy();
  });
});
