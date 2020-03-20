import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinIdComponent } from './coin-id.component';

describe('CoinIdComponent', () => {
  let component: CoinIdComponent;
  let fixture: ComponentFixture<CoinIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
