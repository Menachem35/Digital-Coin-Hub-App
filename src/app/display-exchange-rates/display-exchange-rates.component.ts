import { Component, OnInit } from '@angular/core';

import { ExchangeRatesService } from '../shared/services/exchange-rates.service';

@Component({
  selector: 'app-display-exchange-rates',
  templateUrl: './display-exchange-rates.component.html',
  styleUrls: ['./display-exchange-rates.component.scss']
})
export class DisplayExchangeRatesComponent implements OnInit {

  constructor(
		private exhangeRateService: ExchangeRatesService    
  ) { }

  // Holds currencies exchange rates
  private currenciesRates: any[];

  // Get the response from API
  private baseUSD: any;

  private currenciesPairs: string[] = ['EUR/USD', 'EUR/GBP', 'USD/CAD', 'AUD/CAD', 'USD/JPY', 'USD/ILS', 'ILS/USD', 'CHF/USD'];

  public coinsPairs: any[] = [
    /*{
      'coins':  this.currenciesPairs,
    },
    {
      'coins': this.currenciesPairs,
    },
    {
      'coins': this.currenciesPairs,
    },
    {
      'coins': this.currenciesPairs,
    },
    {
      'coins': this.currenciesPairs,
    }*/
  ];

  public displayBids: number = 0;

  /**
   * @param $event - get selected option from dropdown
   */
  setSelectedCurrencies($event, index): void {
    //this.selectedCoinsPair = $event.target.options[$event.target.options.selectedIndex].text;
    this.coinsPairs[index].currentCoin = $event.target.value;
    this.coinsPairs[index].currency1.symbol = $event.target.value.substr(0, 3);
    this.coinsPairs[index].currency1.price = (this.baseUSD[$event.target.value.substr(0, 3)]).toFixed(2);
    this.coinsPairs[index].currency2.symbol = $event.target.value.substr(4, 3);
    this.coinsPairs[index].currency2.price = (this.baseUSD[$event.target.value.substr(4, 3)]).toFixed(2);
  }

  /**
   * Adds new pair when click the green plus button
   */
  addCoinsPair(): void {
    this.coinsPairs.push(
      {
        'coins': this.currenciesPairs,
            'currentCoin': '',
            'currency1': {
                symbol: '',
                price: ''
            },
            'currency2': {
                symbol: '',
                price: ''
            },
            'x':1
      }
    );
  }

  /**
   * Remove container
   * @param selectedItem - array index
   */
  removeItem(selectedItem): void {
    this.coinsPairs.splice(selectedItem, 1);
  }

  /**
	 * Get FOREX rates from API
	 */
	getCurrenciesRates(): void {
		this.exhangeRateService.getExchangeRates('USD').subscribe(data => {console.log('data is:', data);
      this.baseUSD = data.rates;
      this.currenciesRates = Object.keys(data.rates).map(x => {
        return {[x]: data.rates[x]/*.toFixed(2)*/}
      });

      this.coinsPairs = this.currenciesRates.slice(0, 5).map((x, index) => {
          return {
            'coins': this.currenciesPairs,
            'currentCoin': this.currenciesPairs[index],
            'currency1': {
                symbol: this.currenciesPairs[index].substr(0, 3),
                price: (this.baseUSD[this.currenciesPairs[index].substr(0, 3)]).toFixed(2)
            },
            'currency2': {
                symbol: this.currenciesPairs[index].substr(4,3),
                price: (this.baseUSD[this.currenciesPairs[index].substr(4, 3)]).toFixed(2)
            },
            'x':x
          };
      });
      console.log('coinsPairs:', this.coinsPairs);
      console.log('currencies rate',this.currenciesRates);
      /*console.log(data);
      console.log(data.rates);*/
		});
  }
  
  getPairsRates(): void {
    this.exhangeRateService.getExchangeRateCurrenciesPair('USD', 'CAD').subscribe(data => {
      //console.log("Shoko is:", data);
    });
  }

  ngOnInit(): void {
    this.getPairsRates();
    this.getCurrenciesRates();
  }

}
