
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { map } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material/material.module';
import { TaskService } from 'src/app/shared/task/service/task.service';


@Component({
  selector: 'app-view-task-coverage',
  templateUrl: './view-task-coverage.component.html',
  styleUrls: ['./view-task-coverage.component.scss']
})
export class ViewTaskCoverageComponent implements OnInit {

  statusCoverage: any = [];
  taskCoverage: any = [];

  constructor(
    public dialogRef: MatDialogRef<ViewTaskCoverageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public taskService: TaskService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.taskService.TaskCoverage(this.data)
        .pipe(map(res => {
          if (res.Status == 200) {
            this.statusCoverage = res.data;
            for (var i in this.statusCoverage) {
              var count = this.statusCoverage[i];
              if (i == 'Not Started') {
                i = 'Not Accepted';
              }
              if (i == 'Pending') {
                i = 'Partial Complete';
              }
              this.taskCoverage.push({
                'Name': i,
                'Count': count
              });
            }
          }
        })).subscribe()
    }
  }

  close():void{
    return this.dialogRef.close();
  }

}
