import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { TaskService } from 'src/app/shared/task/service/task.service';
import { ViewImageDialogComponent } from '../view-image-dialog/view-image-dialog.component';

@Component({
  selector: 'app-view-task-details',
  templateUrl: './view-task-details.component.html',
  styleUrls: ['./view-task-details.component.scss']
})
export class ViewTaskDetailsComponent implements OnInit {

  taskDetails: any;
  commentDetails: any;
  imagePreview: any;
  isImage: boolean = false;
  imageName: string = '';
  imageExt: string = '';
  imagePath: any = '';
  MultimediaLink: any = '';
  currentUser: any;
  permisions: any;
  fileToUpload: any;
  isDoc:boolean = false;
  imgPath:any
 
  customerStatusList = [];
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewTaskDetailsComponent>,
    private taskService: TaskService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private authService: AuthService,
    private chRef: ChangeDetectorRef,
    public datePipe: DatePipe,
  
  ) {
   
  }

  ngOnInit() {
    this.taskService.getTaskDetails(this.data.taskId)
      .pipe(
        map(res => {
          this.taskDetails = res.data;
          this.imgPath=res.data.MultimediaName;
          console.log( this.imgPath)
          // console.log( this.taskDetails)
        })).subscribe();
  }

 
  showPreview() {
    this.dialog.open(ViewImageDialogComponent, { data:  this.imgPath,width: '25rem',height:'25rem' });
  }

  close():void{
    return this.dialogRef.close();
  }




}



