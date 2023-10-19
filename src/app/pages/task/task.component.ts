import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  ngOnInit(): void {

  }
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
   

  
   
    const dialogRef = this.dialog.open(AddTaskComponent, {
      
      width: '45rem',
      height: '30rem'

    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}
