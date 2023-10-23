import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { AddMembersComponent } from '../add-members/add-members.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { TaskService } from 'src/app/shared/task/service/task.service';
import { AuthInterceptor } from 'src/app/shared/auth/auth.interceptor';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CustomPipePipe } from 'src/app/base/pipes/custom-pipe.pipe';
import { ToastrService } from 'ngx-toastr';
import { TabConditionComponent } from '../tab-condition/tab-condition.component';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';











@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  addForm!:FormGroup;
  public attachFileValue:string | undefined;
  value:any
  allMembers:any
  imageValid:any
  url="assets/cancel.svg"
  taskOwners:any = [];
  userIds: any = [];
  memberLength: number = 0;
  userLength: number = 0;
  assignedToCount:any
  current = new Date();
  isActive: boolean = true;
  IntercomGroupIds=[]
  result:any
  index = 0;
  indexOld = 0;

  taskOwnerCount:any
  pageData = {
    From: 1,
    To: -1,
    Text: '',
  }
  customerList:any
  leadFilter:any
  selectedIndex: number = 0;
  userDetails: any;
 formattedDate:any;
 currentTabIndex=0
 @ViewChild('tabGroup') tabGroup!: MatTabGroup ; 
 @ViewChildren('tab') tabs: QueryList<ElementRef> | undefined;

 
  constructor(
   
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    public dialog:MatDialog,
    private taskService:TaskService,
    private datePipe: DatePipe,
    private customDatePipe: CustomPipePipe,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm()
    // this.getLeadList();
  

    // this.taskService.imageData$.subscribe((data) => {
    //   console.log(data)
      // this.attachFile = data;
    // });
  }
  
  change(tab: any, index: number) {
    if (tab.selectedIndex != this.indexOld && confirm(' Are you sure you want to switch to the next tab without submitting the form?')) {
      this.index = index;
      this.indexOld = index;
    } else tab.selectedIndex = this.indexOld;
  }
    
    initForm(){
      const userDetailsJson = localStorage.getItem('userdetails');


   
  
        this.userDetails = JSON.parse(userDetailsJson||'');
        console.log(this.userDetails.UserId)
        const userId = this.userDetails.UserId;

      
  
      this.addForm=this.fb.group({
        Id: [''],
        AssignedBy: [''],
        AssignedToUserId: [''],
        AssignedDate: [''],
        CompletedDate: [''],
         IntercomGroupIds: [''],
         Latitude: [''],
        Title:['',Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z ]+$/)])],
        Description:['',Validators.compose([Validators.required])],
        Image:['',Validators.compose([Validators.required])],
   
        IsActive: [this.isActive],
        Priority:['',Validators.compose([Validators.required])],
     
        LeadId:[''],

        TaskEndDateDisplay: ['', Validators.required],
        TaskEndDate: [''],
        UserDisplayIds:['',Validators.compose([Validators.required])],
        UserIds:[''],
        TaskDisplayOwners:['',Validators.compose([Validators.required])],
        TaskOwners:[[]],
        Location: [''],
Longitude: [''],
MultimediaData: [''],
MultimediaExtension:[''],
MultimediaFileName: [''],
MultimediaType: [''],
TaskStatus: ['']
        
      })

      
     
     
     
      

    }


   

    get Title(){
      return this.addForm.get('Title')
    

    }
    get Description(){
      return this.addForm.get('Description')
    

    }
    get Image(){
      return this.addForm.get('Image')
    

    }
    get leadCustName(){
      return this.addForm.get('leadCustName')
    

    }
    get picker(){
      return this.addForm.get('picker')
    

    }
    get Priority(){
      return this.addForm.get('Priority')
    

    }
    get users(){
      return this.addForm.get('users')
    

    }
    get ccMembers(){
      return this.addForm.get('ccMembers')
    

    }

    titleTouched = false;

// ...

onTitleInput() {
  this.titleTouched = true;
}

    // showNumberError = false;

// onTitleInput() {
//   const titleValue = this.addForm.get('Title');
//  if (titleValue) {
//     const value = titleValue.value;
//     const containsNumber = /[0-9]/.test(value);
//     this.showNumberError = containsNumber;
//    this. showNumberError=true
//   }
// } 
  close():void{
    return this.dialogRef.close();
  }


  onOpenFile():void{
    const dialogRef=this.dialog.open(UploadFileComponent,{
      width: '20rem',
      height:'20rem'
    });
    dialogRef.afterClosed().subscribe((res )=> {
      console.log(res)
      this.attachFileValue = res.name;
      // if (this.attachFileValue) {
        
      // }
    })

  }

  
  onFileSelect(event:any){
    console.log("hello"+event.target.value)
    let fileType = event.target.files[0].type;
    // let size = event.target.files[0].size;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          // Once the image has loaded, you can get its width and height
          const width = img.width;
          const height = img.height;
          this.imageValid = false;
          if (width > 310 && height > 325) {
            console.log('Image is too large.');
            this.imageValid = true;
            return;
          } else {
            console.log('Image is valid.');
            this.url = event.target.result;
            console.log(this.url)
           
          }
        };
        img.src = URL.createObjectURL(file);
      };
    } else {
      window.alert('Please select correct image format');
    }

  }


  
 

  //   openMembers(controlName:any): void {
  //     const controls = this.addForm.controls;
  //     let controlname;
  //     let params;
  //     if (controlName == 'UserIds') {
  //       controls.UserDisplayIds.clearValidators();
  //       controls.UserDisplayIds.updateValueAndValidity();
  //       controlname = controls.UserDisplayIds;}
  //       // params = { usersIds: this.userIds, controlname: 'UserIds', Action: this.data.Action };}
  //       // else {
  //       //   controlname = controls.TaskDisplayOwners;
  //       //   params = { usersIds: this.taskOwners, controlname: 'TaskOwner', Action: this.data.Action };
  //       // }

  //     const dialogRef = this.dialog.open(AddMembersComponent,{  width: '400px' ,height:'30rem'} 
       
  //     );

  //     dialogRef.afterClosed().subscribe((allUSer )=> {
  //       // console.log(allUSer)
  //       this.allMembers=allUSer

  //       if (controlName == 'UserIds') {
  //         this.userIds = [];
  //         this.assignedToCount = 0
  //         allUSer.forEach((result:any) => {
         
  //           if (!this.userIds.includes(result.UserId)) {
  //             this.userIds.push(result.UserId); 
  //             this.assignedToCount++; 
  //           }})
        
  //       }
  //       else {
  //         this.taskOwners = [];
  //         this.taskOwnerCount = 0
  //         allUSer.forEach((result:any) => {
  //           if (!this.taskOwners.includes(result)){
  //             this.taskOwnerCount+=1;
  //               this.taskOwners.push(result);
  //           }
  //       console.log(this.taskOwners)
  //       console.log(this.taskOwnerCount)
  //     }
      
  //     )
  //   }
  // }


  // // save(val:any){
  // //   val(controlname)=this.url
  // //   this.form(val).sub
  // // }


  //     )}

  openMembers(controlName:any) {
    const controls = this.addForm.controls;
    let controlname:any;
    let params;
    if (controlName == 'UserIds') {
      controls.UserDisplayIds.clearValidators();
      controls.UserDisplayIds.updateValueAndValidity();
      controlname = controls.UserDisplayIds;
      params = { usersIds: this.userIds, controlname: 'UserIds' };
    }
    else {
      controlname = controls.TaskDisplayOwners;
      params = { usersIds: this.taskOwners, controlname: 'TaskOwner' };
    }
    const dialogRef = this.dialog.open(AddMembersComponent, { data: params, width: '400px' });
    dialogRef.afterClosed().subscribe(allUSer => {
      if (!allUSer)
        return
      if (controlName == 'UserIds') {
        this.userIds = [];
        this.assignedToCount = 0
        allUSer.forEach((result:any) => {
         
            this.userIds.push(result.UserId);
            this.assignedToCount+=1;
          
        })
       
      }
      else {
        this.taskOwners = [];
        this.taskOwnerCount = 0
        allUSer.forEach((result: any) => {
          
          this.taskOwners.push(result);
          
          this.taskOwnerCount+=1;
          
          
        })
        this.addForm.get('TaskOwners')?.patchValue(this.taskOwners);
        console.log(this.taskOwners)
      }
      this.memberLength = this.taskOwners.length;
      if (this.taskOwners.length <= 1 && controlname == controls.TaskDisplayOwners) {
        controlname.setValue(this.taskOwners.length + ' User');
      }
      if (this.taskOwners.length > 1 && controlname == controls.TaskDisplayOwners) {
        controlname.setValue(this.taskOwners.length + ' Users');
      }
      this.userLength = this.userIds.length;
      if (this.userIds.length <= 1 && controlname == controls.UserDisplayIds) {
        controlname.setValue(this.userIds.length + ' User');
      }
      if (this.userIds.length > 1 && controlname == controls.UserDisplayIds) {
        controlname.setValue(this.userIds.length + ' Users');
      }
    });
  }



      // getLeadList(){
        // this.taskService.CustomerList(this.pageData)
        // .pipe(map(res => {
        //   console.log(res)
        //   // this.customerList = res.data.Leads;
        //   // console.log(this.customerList)
        //   // this.leadFilter = this.customerList;
         
        //   // console.log(this.leadFilter)
        // }
  
        // ))
        // .subscribe()
      // }


      // submit(){
        
      // }

      // onSubmit() {
      //   const selectTab = this.selectedIndex;
      //   if (this.data.Action == 'Add') {
      //     const controls = this.addForm.controls;
      //     if (this.selectedIndex == 1) {
      //       controls.UserDisplayIds.disable();
      //     }
      //     if (this.addForm.invalid) {
      //       Object.keys(controls).forEach(controlName => {
      //         controls[controlName].markAsTouched();
      //       });
      //       return;
      //     }
      //     if (this.selectedIndex == 0) {
      //       controls.UserDisplayIds.setValidators(Validators.required);
      //       controls.UserDisplayIds.updateValueAndValidity();
      //       controls.UserIds.setValue(this.userIds);
      //     }
      //     if (this.selectedIndex == 1) {
      //       controls.UserDisplayIds.disable();
      //       this.userIds = [];
      //       this.userIds.push(this.data.UserId);
      //       controls.UserIds.setValue(this.userIds);
      //     }
      //     controls.TaskOwners.setValue(this.taskOwners);
      //     let imageData = controls.Image.value;
      //     controls.MultimediaData.setValue(imageData);
      //     // controls.MultimediaExtension.setValue(this.imageExt);
      //     // controls.MultimediaFileName.setValue(this.imageName);
    
      //     // if (this.imageExt == 'jpeg' || this.imageExt == 'JPEG' || this.imageExt == 'jpg' ||
      //     //   this.imageExt == 'JPG' || this.imageExt == 'png' || this.imageExt == 'PNG' || this.imageExt == 'svg'
      //     //   || this.imageExt == 'SVG') {
      //     //   controls.MultimediaType.setValue('I');
      //     // }
      //     // else {
      //     //   if (this.imageExt) {
      //     //     controls.MultimediaType.setValue('D');
      //     //   } else {
      //     //     controls.MultimediaType.setValue('');
      //     //   }
      //     // }
    
      //     // let customDate = this.customDatePipe.transform(controls.TaskEndDateDisplay.value, 0, 'd MMM yyyy hh:mm a')
      //     // controls.TaskEndDate.setValue(customDate);

      //     // const date = new Date(this.TaskEndDateDisplay);
       
      //     let customDate  = this.datePipe.transform(controls.TaskEndDateDisplay.value, 'd MMM y h:mm a');
      //    console.log(customDate)
      //    controls.TaskEndDate.setValue(customDate);
      //     // this.viewLoading = true;
      //     this.taskService.addTask(this.addForm.value)
      //       .pipe(map(res => {
      //         if (res.Status == 200) {
      //           this.dialogRef.close({ res, selectTab });
      //           // this.viewLoading = false;
      //         }
    
      //       })).subscribe();
      //   }
      
      // }
      submit() {
      
        const selectTab = this.selectedIndex;
          const controls = this.addForm.controls;
          controls.UserIds.setValue(this.userIds);
          controls.AssignedBy.setValue(this.userDetails.UserId);
      
       
          
          // if (this.selectedIndex == 1) {
          //   controls.UserDisplayIds.disable();
          // }
          // if (this.addTaskForm.invalid) {
          //   Object.keys(controls).forEach(controlName => {
          //     controls[controlName].markAsTouched();
          //   });
          //   return;
          // }
          // if (this.selectedIndex == 0) {
          //   controls.UserDisplayIds.setValidators(Validators.required);
          //   controls.UserDisplayIds.updateValueAndValidity();
          //   controls.UserIds.setValue(this.userIds);
          // }
          // if (this.selectedIndex == 1) {
          //   controls.UserDisplayIds.disable();
          //   this.userIds = [];
          //   this.userIds.push(this.data.UserId);
          //   controls.UserIds.setValue(this.userIds);
          // }
          // want
          // controls.TaskOwners.setValue(this.taskOwners);
          // let imageData = controls.Image.value;
          // controls.MultimediaData.setValue(imageData);
          // want
          // controls.MultimediaExtension.setValue(this.imageExt);
          // controls.MultimediaFileName.setValue(this.imageName);
    
          // if (this.imageExt == 'jpeg' || this.imageExt == 'JPEG' || this.imageExt == 'jpg' ||
          //   this.imageExt == 'JPG' || this.imageExt == 'png' || this.imageExt == 'PNG' || this.imageExt == 'svg'
          //   || this.imageExt == 'SVG') {
          //   controls.MultimediaType.setValue('I');
          // }
          // else {
          //   if (this.imageExt) {
          //     controls.MultimediaType.setValue('D');
          //   } else {
          //     controls.MultimediaType.setValue('');
          //   }
          // }
    
          // let customDate = this.customDatePipe.transform(controls.TaskEndDateDisplay.value, 0, 'd MMM yyyy hh:mm a')
          // controls.TaskEndDate.setValue(customDate);
          // this.viewLoading = true;
          let customDate  = this.datePipe.transform(controls.TaskEndDateDisplay.value, 'd MMM yyyy hh:mm a');
          console.log(customDate)
          controls.TaskEndDate.setValue(customDate);
          this.taskService.addTask(this.addForm.value)
        
            .pipe(map(res => {
             
                this.dialogRef.close({ res });
                console.log(res)
                this.toastr.success('success');
              
    
            })).subscribe();
        

      }





      // onTabChange(event: MatTabChangeEvent) {
    
      //   if (event.index === 1) {
         
      //     const dialogRef = this.dialog.open(TabConditionComponent);
    
          
      //     dialogRef.afterClosed().subscribe(result => {
      //       if (result) {
              
              
      //       } else {
             
      //       }
      //     });
      //   }

        onTabChange(event: MatTabChangeEvent) {
          if (event.index === 1) {
            const dialogRef = this.dialog.open(TabConditionComponent);
        
            dialogRef.afterClosed().subscribe(result => {
              if (!result) {
               
                this.currentTabIndex = 0;
              }
            });
          } else {
       
            this.currentTabIndex = event.index;
          }



}
 

}
    

function preventTabChange(event: MatTabChangeEvent, Event: { new(type: string, eventInitDict?: EventInit | undefined): Event; prototype: Event; readonly NONE: 0; readonly CAPTURING_PHASE: 1; readonly AT_TARGET: 2; readonly BUBBLING_PHASE: 3; }, tabToPrevent: any, number: any) {
  throw new Error('Function not implemented.');
}

