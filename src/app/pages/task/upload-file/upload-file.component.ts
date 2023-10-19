import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { TaskService } from 'src/app/shared/task/service/task.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  imageFileName:string | undefined
  uploadForm!:FormGroup
  files:any
  data:any
 
  constructor(
    public dialogRef: MatDialogRef<UploadFileComponent>,
    private fb:FormBuilder,
    private taskservice:TaskService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }


  initForm(){
    this.uploadForm=this.fb.group({
      imageFile:[]

    })
  }
  

  onChange(event:any){
    let files = event.target.files[0];
    this.imageFileName = files.name;
    this.files = files;


  }


  uploadFile(){
   const imgFile=this.files;
    // if(this.files.size>2048){
    //   console.log("hello")
    // }
    // else{

      // this.taskservice.setImage(imgFile);
      this.dialogRef.close(imgFile)
      // this.dialogRef.afterClosed().subscribe((res)=>{
      //   console.log(res)
      // })
          
         
    // }
  }
}
