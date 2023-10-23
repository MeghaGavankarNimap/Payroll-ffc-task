import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnarchiveDialogComponent } from '../unarchive-dialog/unarchive-dialog.component';

@Component({
  selector: 'app-archive-unarchive',
  templateUrl: './archive-unarchive.component.html',
  styleUrls: ['./archive-unarchive.component.scss']
})
export class ArchiveUnarchiveComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<UnarchiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
