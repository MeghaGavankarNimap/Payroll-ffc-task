import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomPipePipe } from 'src/app/base/pipes/custom-pipe.pipe';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  userDetails: any;

  // constructor() { }

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
