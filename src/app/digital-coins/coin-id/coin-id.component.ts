import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

import { CoinModalComponent } from '../coin-modal/coin-modal.component';

// Angular Material
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-coin-id',
  templateUrl: './coin-id.component.html',
  styleUrls: ['./coin-id.component.scss']
})
export class CoinIdComponent implements OnInit, ICellRendererAngularComp {

  constructor(public dialog: MatDialog) { }

  public params: any;

  openDialog(): void {
		this.dialog.open(CoinModalComponent, {
		  data: {
			  coin: this.params.data.coin[0]
		  }
		});
	  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
}

  ngOnInit(): void {
  }

}
