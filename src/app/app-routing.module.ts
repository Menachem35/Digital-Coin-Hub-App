import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
   { path: '', redirectTo: '/main', pathMatch: 'full' }, 
   { path: 'main',          component: MainViewComponent },
   { path: 'buy-sell', component: BuySellBitcoinComponent },
   { path: 'digital-wallet', component: DigitalWalletComponent },
   { path: 'jobs', component: JobsComponent },
   { path: 'digital-coins', component: DigitalCoinsComponent },
   { path: 'mining', component: MiningComponent},
   { path: 'startups', component: StartupsComponent },
   { path: 'ethereum', component: EthereumComponent },
   { path: 'news', component: NewsComponent },
   { path: 'buy-with-digital-coin', component: BuyWithDigitalCoinComponent },
   { path: 'investment', component: InvestmentComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}