import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayExchangeRatesComponent } from './display-exchange-rates.component';

describe('DisplayExchangeRatesComponent', () => {
  let component: DisplayExchangeRatesComponent;
  let fixture: ComponentFixture<DisplayExchangeRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayExchangeRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayExchangeRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
