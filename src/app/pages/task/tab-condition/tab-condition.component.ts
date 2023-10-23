import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tab-condition',
  templateUrl: './tab-condition.component.html',
  styleUrls: ['./tab-condition.component.scss']
})
export class TabConditionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TabConditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

}
