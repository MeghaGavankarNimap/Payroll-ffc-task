import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { AddMembersComponent } from '../add-members/add-members.component';

import { TaskService } from 'src/app/shared/task/service/task.service';
import { AuthInterceptor } from 'src/app/shared/auth/auth.interceptor';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CustomPipePipe } from 'src/app/base/pipes/custom-pipe.pipe';
import { ToastrService } from 'ngx-toastr';
import { TabConditionComponent } from '../tab-condition/tab-condition.component';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { invalid } from '@angular/compiler/src/render3/view/util';











@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  addForm!: FormGroup;
  public attachFileValue: string | undefined;
  value: any
  allMembers: any
  imageValid: any
  url = "assets/cancel.svg"
  taskOwners: any = [];
  userIds: any = [];
  userId: any = [];
  memberLength: number = 0;
  userLength: number = 0;
  assignedToCount: any
  current = new Date();
  isActive: boolean = true;
  IntercomGroupIds = []
  result: any
  index = 0;
  indexOld = 0;
  displayFileName: string = '';
  imageName: string = '';
  imageExt: string = '';

  taskOwnerCount: any
  pageData = {
    From: 1,
    To: -1,
    Text: '',
  }
  customerList: any
  leadFilter: any
  selectedIndex: number = 0;
  userDetails: any;
  formattedDate: any;
  currentTabIndex = 0
  selectedCurrentIndex = 0;
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChildren('tab') tabs: QueryList<ElementRef> | undefined;
  @ViewChild('imageFileInput', { static: false }) imageFileInput!: ElementRef;

  constructor(

    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private taskService: TaskService,
    private datePipe: DatePipe,
    private customDatePipe: CustomPipePipe,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm()
   
  }

  change(tab: any, index: number) {
    console.log(tab.selectedIndex)
    
    if (tab.selectedIndex != this.indexOld && confirm(' Are you sure you want to switch to the next tab without submitting the form?')) {
     
      this.indexOld = index;
      this.selectedCurrentIndex = tab.selectedIndex;
    } else {
      this.selectedCurrentIndex = this.indexOld;
      tab.selectedIndex = this.indexOld;
    }
  }

  initForm() {
    const userDetailsJson = localStorage.getItem('userdetails');




    this.userDetails = JSON.parse(userDetailsJson || '');
    console.log(this.userDetails.UserId)
    const userId = this.userDetails.UserId;



    this.addForm = this.fb.group({
      Id: [''],
      AssignedBy: [''],
      AssignedToUserId: [''],
      AssignedDate: [''],
      CompletedDate: [''],
      IntercomGroupIds: [''],
      Latitude: [''],
      Title: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z ]+$/)])],
      Description: ['', Validators.compose([Validators.required])],
      Image: ['', Validators.compose([Validators.required])],

      IsActive: [this.isActive],
      Priority: ['', Validators.compose([Validators.required])],

      LeadId: [''],

      TaskEndDateDisplay: ['', Validators.required],
      TaskEndDate: [''],
      UserDisplayIds: ['', Validators.compose([Validators.required])],
      UserIds: [''],
      TaskDisplayOwners: ['', Validators.compose([Validators.required])],
      TaskOwners: [[]],
      Location: [''],
      Longitude: [''],
      MultimediaData: [''],
      MultimediaExtension: [''],
      MultimediaFileName: [''],
      MultimediaType: [''],
      TaskStatus: ['']

    })







  }




  get Title() {
    return this.addForm.get('Title')


  }
  get Description() {
    return this.addForm.get('Description')


  }
  get Image() {
    return this.addForm.get('Image')


  }
  get leadCustName() {
    return this.addForm.get('leadCustName')


  }
  get picker() {
    return this.addForm.get('picker')


  }
  get Priority() {
    return this.addForm.get('Priority')


  }
  get users() {
    return this.addForm.get('users')


  }
  get ccMembers() {
    return this.addForm.get('ccMembers')


  }

  get UserDisplayIds() {
    return this.addForm.get('UserDisplayIds')
  }



  get TaskDisplayOwners() {
    return this.addForm.get('TaskDisplayOwners')
  }

  get TaskEndDateDisplay() {
    return this.addForm.get('TaskEndDateDisplay')
  }


  // ...



  close(): void {
    return this.dialogRef.close();
  }


  // onOpenFile():void{
  //   const dialogRef=this.dialog.open(UploadFileComponent,{
  //     width: '20rem',
  //     height:'20rem'
  //   });
  //   dialogRef.afterClosed().subscribe((res )=> {
  //     console.log(res)
  //     this.attachFileValue = res.name;
  //     // if (this.attachFileValue) {

  //     // }
  //   })

  // }
  openFile() {
    this.imageFileInput.nativeElement.click();
  }

  handleFileSelect(inputValue: any): void {
    if (inputValue.files[0] && inputValue.files[0].size < 2000000) {
      var file = inputValue.files[0];
      this.displayFileName = file.name;
      this.imageName = this.displayFileName.replace(/\\/g, "/");
      const imageNameMatch = /[^/]*$/.exec(this.imageName);
      this.imageName = imageNameMatch ? imageNameMatch[0] : '';

      const imageExtMatch = /[^.]*$/.exec(this.imageName);
      this.imageExt = imageExtMatch ? imageExtMatch[0] : '';

      this.imageName = this.imageName.substring(0, this.imageName.lastIndexOf('.'));
      var reader = new FileReader();
      reader.onload = (e: any) => {
        var binaryData = e.target.result;
        var base64String = btoa(binaryData);
        var imagePath = base64String;
        this.addForm.patchValue({
          Image: imagePath
        });
      }
      reader.readAsBinaryString(file);
    } else if (inputValue.files[0] && inputValue.files[0].size > 2000000) {
      this.toastr.error('File size is greater than 2MB');
      // this.chRef.detectChanges();
    }
  }

  removeFile() {
    this.imageFileInput.nativeElement.value = '';
    this.displayFileName = '';
    this.addForm.patchValue({
      Image: '',
      MultimediaData: '',
      MultimediaExtension: '',
      MultimediaFileName: '',
      MultimediaType: ''
    });
  }


  





  

  openMembers(controlName: any) {
    const controls = this.addForm.controls;
    let controlname: any;
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
        allUSer.forEach((result: any) => {

          this.userIds.push(result.UserId);
          this.assignedToCount += 1;

        })

      }
      else {
        this.taskOwners = [];
        this.taskOwnerCount = 0
        allUSer.forEach((result: any) => {

          this.taskOwners.push(result);

          this.taskOwnerCount += 1;


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



 
  
  submit() {
    console.log(this.selectedCurrentIndex);
    
    if (this.addForm.invalid) {
     this.addForm.markAllAsTouched();
     console.log("it invalid")

      return;
    }
   

    const controls = this.addForm.controls;
  
   
    // if (this.addForm.invalid) {
    //   Object.keys(controls).forEach(controlName => {
    //     controls[controlName].markAsTouched();
    //   });
    //   return;
    // }

    
   if ( this.selectedCurrentIndex==1) {
      console.log("one")
      controls.UserDisplayIds.disable();
      // this.userId = [];
      this.userId.push(this.userDetails.UserId);
      console.log(this.userId)
      controls.UserIds.setValue(this.userId);
      
    }
    else{
      console.log("zero")
      controls.UserDisplayIds.setValidators(Validators.required);
      controls.UserDisplayIds.updateValueAndValidity();
      controls.UserIds.setValue(this.userIds);

    }


    // 
    // const selectTab = this.selectedIndex;
    // const controls = this.addForm.controls;
    // controls.UserIds.setValue(this.userIds);
    controls.AssignedBy.setValue(this.userDetails.UserId);

    //  controls.Image.setValue(this.url)
    let imageData = controls.Image.value;
    controls.MultimediaData.setValue(imageData);
    controls.MultimediaExtension.setValue(this.imageExt);
    controls.MultimediaFileName.setValue(this.imageName);

    if (this.imageExt == 'jpeg' || this.imageExt == 'JPEG' || this.imageExt == 'jpg' ||
      this.imageExt == 'JPG' || this.imageExt == 'png' || this.imageExt == 'PNG' || this.imageExt == 'svg'
      || this.imageExt == 'SVG') {
      controls.MultimediaType.setValue('I');
    }
    else {
      if (this.imageExt) {
        controls.MultimediaType.setValue('D');
      } else {
        controls.MultimediaType.setValue('');
      }
    }






    let customDate = this.datePipe.transform(controls.TaskEndDateDisplay.value, 'd MMM yyyy hh:mm a');
    console.log(customDate)
    controls.TaskEndDate.setValue(customDate);
    this.taskService.addTask(this.addForm.value)

      .pipe(map(res => {

        this.dialogRef.close({ res });
        console.log(res)
        this.toastr.success('Task added successfully');


      })).subscribe();
    // }

  }
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








