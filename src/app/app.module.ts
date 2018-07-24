import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // import the HTTP library to make our API calls

import { AppRoutingModule } from './app-routing.module';

import { DigitalCoinHubService } from './digital-coin-hub.service';
import { DataDisplayFromAPI } from './data-display-from-api.service';

import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { BuySellBitcoinComponent } from './buy-sell/buy-sell.component';
import { DigitalWalletComponent } from './digital-wallet/digital-wallet.component';
import { JobsComponent } from './jobs/jobs.component';
import { DigitalCoinsComponent } from './digital-coins/digital-coins.component';
import { MiningComponent } from './mining/mining.component';
import { StartupsComponent } from './startups/startups.component';
import { EthereumComponent } from './ethereum/ethereum.component';
import { NewsComponent } from './news/news.component';
import { BuyWithDigitalCoinComponent } from './buy-with/buy-with.component';
import { InvestmentComponent } from './investment/investment.component';
import { BannerWideComponent } from './banner-wide/banner-wide.component';

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
	BannerWideComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	HttpClientModule,
  ],
  providers: [DigitalCoinHubService, DataDisplayFromAPI],
  bootstrap: [AppComponent]
})
export class AppModule { }
