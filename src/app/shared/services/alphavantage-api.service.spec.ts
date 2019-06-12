import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';

import { AlphavantageApiService } from './alphavantage-api.service';

describe('AlphavantageApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
	  imports: [HttpClientTestingModule],
	  providers: [AlphavantageApiService]
  }));

  it('should be created', () => {
    const service: AlphavantageApiService = TestBed.get(AlphavantageApiService);
    expect(service).toBeTruthy();
  });
});
