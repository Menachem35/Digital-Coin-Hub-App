import { TestBed, async } from '@angular/core/testing';

import { AppRoutingModule } from './app-routing.module';

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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
	  imports: [AppRoutingModule]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Digital Coin Hub'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Digital Coin Hub');
  }));

  /*it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  }));*/
});
