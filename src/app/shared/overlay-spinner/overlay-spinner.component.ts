import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-overlay-spinner',
  templateUrl: './overlay-spinner.component.html',
  styleUrls: ['./overlay-spinner.component.scss']
})
export class OverlaySpinnerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OverlaySpinnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.data.gotData.subscribe(x => {
      if (x === true) {
        this.dialogRef.close();
      }
    });
  }

}
