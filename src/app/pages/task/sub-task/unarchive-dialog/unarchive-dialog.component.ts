import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unarchive-dialog',
  templateUrl: './unarchive-dialog.component.html',
  styleUrls: ['./unarchive-dialog.component.scss']
})
export class UnarchiveDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<UnarchiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
