import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-exchange-rates',
  templateUrl: './display-exchange-rates.component.html',
  styleUrls: ['./display-exchange-rates.component.scss']
})
export class DisplayExchangeRatesComponent implements OnInit {

  constructor() { }

  public coinsPair: any[] = [
    {
      'coins': ['EUR/USD', 'EUR/GBP', 'USD/CAD', 'AUD/CAD', 'USD/JPY'],
    },
    {
      'coins': ['EUR/USD', 'EUR/GBP', 'USD/CAD', 'AUD/CAD', 'USD/JPY'],
    },
    {
      'coins': ['EUR/USD', 'EUR/GBP', 'USD/CAD', 'AUD/CAD', 'USD/JPY'],
    },
    {
      'coins': ['EUR/USD', 'EUR/GBP', 'USD/CAD', 'AUD/CAD', 'USD/JPY'],
    },
    {
      'coins': ['EUR/USD', 'EUR/GBP', 'USD/CAD', 'AUD/CAD', 'USD/JPY'],
    }
  ];

  public displayBids: number = 0;

  /**
   * @param $event - get selected option from dropdown
   */
  setSelectedCurrencies($event): void {
    //this.selectedCoinsPair = $event.target.options[$event.target.options.selectedIndex].text;
  }

  /**
   * Adds new pair when click the green plus button
   */
  addCoinsPair(): void {
    this.coinsPair.push(
      {
        'coins': ['EUR/USD', 'EUR/GBP', 'USD/CAD', 'AUD/CAD', 'USD/JPY']
      }
    );
  }

  /**
   * Remove container
   * @param selectedItem - array index
   */
  removeItem(selectedItem): void {
    this.coinsPair.splice(selectedItem, 1);
  }

  ngOnInit(): void {
  }

}
