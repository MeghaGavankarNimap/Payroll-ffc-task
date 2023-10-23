import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-image-dialog',
  templateUrl: './view-image-dialog.component.html',
  styleUrls: ['./view-image-dialog.component.scss']
})
export class ViewImageDialogComponent implements OnInit {
 viewImg:any
  constructor( public dialogRef: MatDialogRef<ViewImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.viewImg=data
    }

  ngOnInit(): void {
  }

}
