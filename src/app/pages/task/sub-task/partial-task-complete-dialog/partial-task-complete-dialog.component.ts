import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

 import { map } from 'rxjs/operators';
import { TaskService } from 'src/app/shared/task/service/task.service';


@Component({
  selector: 'app-partial-task-complete-dialog',
  templateUrl: './partial-task-complete-dialog.component.html',
  styleUrls: ['./partial-task-complete-dialog.component.scss']
})
export class PartialTaskCompleteDialogComponent implements OnInit {

  partialCompletePercent: any = [];
  partialValue: number = 0;
  isChanged: boolean = false;
  selectedValue: number = 0;
  viewLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PartialTaskCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public taskService: TaskService
  ) { }

  ngOnInit() {    
    this.partialValue = this.data.TaskStatusValue;
    this.taskService.getPartialCompleteStatus()
      .pipe(map(res => {
        if (res.Status == 200) {
          this.partialCompletePercent = res.data
        }
      })).subscribe()
  }

  taskValue(valuePercent: number) {
    this.partialValue = valuePercent;
    this.selectedValue = valuePercent;
    this.isChanged = true;
  }

  onSubmit() {
    this.viewLoading = true;
    this.taskService.partialCompleteTask(this.data.TaskId, this.partialValue)
      .pipe(map(res => {
        if (res.Status == 200) {
          this.dialogRef.close({ res, isEdit: true })
        }
        this.viewLoading = false;
      })).subscribe();
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
