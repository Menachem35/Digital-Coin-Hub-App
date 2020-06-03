import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // import the HTTP library to make our API calls

import { AppRoutingModule } from './app-routing.module';

import { AgGridModule } from 'ag-grid-angular';

import { DigitalCoinHubService } from './digital-coin-hub.service';
import { DataDisplayFromAPI } from './data-display-from-api.service';

import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { BuySellBitcoinComponent } from './buy-sell/buy-sell.component';
import { DigitalWalletComponent } from './digital-wallet/digital-wallet.component';
import { JobsComponent } from './jobs/jobs.component';
import { DigitalCoinsComponent } from './digital-coins/digital-coins.component';
import { CoinIdComponent } from './digital-coins/coin-id/coin-id.component';
import { MiningComponent } from './mining/mining.component';
import { StartupsComponent } from './startups/startups.component';
import { EthereumComponent } from './ethereum/ethereum.component';
import { NewsComponent } from './news/news.component';
import { BuyWithDigitalCoinComponent } from './buy-with/buy-with.component';
import { InvestmentComponent } from './investment/investment.component';
import { BannerWideComponent } from './banner-wide/banner-wide.component';

import { OverlaySpinnerComponent } from './shared/overlay-spinner/overlay-spinner.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DisplayExchangeRatesComponent } from './display-exchange-rates/display-exchange-rates.component';
import { NewsItemComponent } from './news/news-item/news-item.component';
import { NewsArchiveComponent } from './news/news-archive/news-archive.component';
import { BarChartComponent } from './shared/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
	MainViewComponent,
	BuySellBitcoinComponent, 
	DigitalWalletComponent,
	JobsComponent,
	DigitalCoinsComponent,
	MiningComponent,
	StartupsComponent,
	EthereumComponent,
	NewsComponent, 
	BuyWithDigitalCoinComponent, 
	InvestmentComponent,
	BannerWideComponent,
	CoinIdComponent,
	OverlaySpinnerComponent,
	DisplayExchangeRatesComponent,
	NewsItemComponent,
	NewsArchiveComponent,
	BarChartComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	AgGridModule.withComponents([CoinIdComponent]),
	BrowserAnimationsModule,
	// Angular Material modules
	MatButtonModule,
	MatDialogModule,
	MatInputModule,
	MatProgressSpinnerModule
  ],
  providers: [DigitalCoinHubService, DataDisplayFromAPI],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
