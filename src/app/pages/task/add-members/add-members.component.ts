import { Component, OnInit } from '@angular/core';
import { from, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from 'src/app/shared/task/service/task.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent implements OnInit {
  viewLoading: boolean = false;
  totalRecords: number = 0;
  lastRowIndex: number = 0;
  data:any;
  noRecords:boolean = false;
  memberList: any = [];
  from:any;
  to:any;
  val=[]
  allData:any
  Name:any

  toppings = new FormControl('');

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    

  constructor(private taskService:TaskService,
    public dialogRef: MatDialogRef<AddMembersComponent>,) { }

  ngOnInit(): void {
  this.getAllMembersList(1,10,'')

  }


  
 getAllMembersList(from:any,to:any,text:string){
  this.taskService.MembersList(from,to,text).pipe(
    map((members: any) =>{
      // console.log(members)
      Array.prototype.push.apply(this.memberList, members.data.Members);
      this.totalRecords = members.data.TotalRecords;
      this.lastRowIndex = this.memberList.length;
      this.viewLoading = false;
      
      this.allData = members.data.Members;
       console.log(this.allData)
       const val=this.allData;
       console.log(val)

      
    })
  ).subscribe();
 }

 

 close(){
  const selectedValues = this.toppings.value;
  this.dialogRef.close(selectedValues);
  // console.log(selectedValues)
 }




 searchMember(searchValue: any) {
  // this.viewLoading = true;
  // this.taskService.MembersList(1, this.totalRecords, searchValue)
  //   .pipe(
  //     map(members => {
  //       this.memberList = members.data.Members;
  //       if (this.memberList == undefined) {
  //         this.noRecords = true
  //       }
  //       else {
  //         this.noRecords = false;
  //       }
  //     })
  //   ).subscribe();
  // this.viewLoading = false;
}
}
