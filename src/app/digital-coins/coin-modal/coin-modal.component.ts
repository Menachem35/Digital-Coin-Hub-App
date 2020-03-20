import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-coin-modal',
  templateUrl: './coin-modal.component.html',
  styleUrls: ['./coin-modal.component.scss']
})
export class CoinModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  public selectedCoin: string;

  ngOnInit(): void {
    this.selectedCoin = this.data.coin;
  }

}
