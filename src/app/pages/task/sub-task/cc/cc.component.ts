import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Subscription, merge } from 'rxjs';
import { distinctUntilChanged, skip, tap } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material/material.module';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { TaskDataSource } from 'src/app/shared/task/datasource/task.datasource';
import { TaskModel } from 'src/app/shared/task/datasource/task.model';
import { TaskService } from 'src/app/shared/task/service/task.service';
import { ViewTaskCoverageComponent } from '../view-task-coverage/view-task-coverage.component';
import { DatePipe } from '@angular/common';
import { ViewTaskDetailsComponent } from '../view-task-details/view-task-details.component';
import { TaskComponent } from '../../task.component';





@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
export class CCComponent implements OnInit {

  dataSource!: TaskDataSource ;
  displayedColumns = ['Title','CustomerName','AssignedBy', 'AssignedDate', 'DueDate', 'Priority', 'Status', 'Action'];
  @ViewChild(MatPaginator, { static: true })paginator!: MatPaginator;
  @Input() userData: { userId: any; } | undefined;
  @Input() searchValue: any;
  @Input() filterData = {
    IsArchive:'',
    Priority:'',
    UserId:'',
    UserIds:[],
    StatusIds: '',
    From:1,
    To:10,
    Title:''
  }
  Data = {
    IsArchive:'',
    Priority:'',
    UserId:'',
    UserIds:[],
    StatusIds: '',
    From:'',
    To:'',
    Title:''
	};
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filterStatus: string = '';
  filterType: string = '';
  selection = new SelectionModel<TaskModel>(true, []);
  taskResult: TaskModel[] = [];
  private subscriptions: Subscription[] = [];
  taskStatusList: any = [];
  searchText :any;
  userIds = [];
  lrmId: number | undefined;
  customerStatusList = [];
  userName: any;
 

  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
   
    private taskService: TaskService,
    private toastrService: ToastrService,
		private authService: AuthService,
    private obj:TaskComponent,
  
  
    private chRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.dataSource = new TaskDataSource(this.taskService);
    const entitiesSubscription = this.dataSource.entitySubject.pipe(
      skip(1),
      distinctUntilChanged()
    ).subscribe(res => {
      this.taskResult = res;
    });
    this.subscriptions.push(entitiesSubscription);
     this.dataSource.loadCC(1, 10,'');
	this.taskService.load.subscribe(
		res=> {
			if(res){
				this.loadCCPage();
			}
		}
	)


  
  

	
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.searchData){
      if (changes.searchData.currentValue != '') {
        this.searchText = changes.searchData.currentValue;
        this.paginator.pageIndex = 0;
        this.loadCCPage();
      }
      if(changes.searchData.currentValue == '' && !changes.searchData.firstChange){
        this.searchText = '';
        this.paginator.pageIndex = 0;
        this.loadCCPage();
      }
    }
  }

	// ngDoCheck() {
	// 	if (this.Data.UserIds !== this.filterData.UserIds ||
  //     this.Data.IsArchive !== this.filterData.IsArchive ||
  //     this.Data.StatusIds !== this.filterData.StatusIds ||
	// 		this.Data.Priority !== this.filterData.Priority
	// 		) {
	// 		this.dataSource.loadCC(this.filterData.From,this.filterData.To,this.filterData.Title,this.filterData.UserId,this.filterData.IsArchive,this.filterData.UserIds,this.filterData.StatusIds,this.filterData.Priority)
  //     this.Data.UserIds = this.filterData.UserIds
  //     this.Data.IsArchive = this.filterData.IsArchive
  //     this.Data.StatusIds = this.filterData.StatusIds
	// 		this.Data.Priority = this.filterData.Priority	}
  // }


  ngAfterViewInit() {
    const paginatorSubscriptions = merge(this.paginator.page).pipe(
      tap(() => this.loadCCPage())
    )
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);
  }

  loadCCPage() {
    this.selection.clear();
    if (this.paginator.pageIndex < 0 || this.paginator.pageIndex > (this.paginator.length / this.paginator.pageSize))
      return;
      if(this.paginator.pageSize==undefined){
        console.log("hello")
      }
     
    let from = ((this.paginator.pageIndex * this.paginator.pageSize) + 1);
    let to = ((this.paginator.pageIndex + 1) * this.paginator.pageSize);
    console.log(this.paginator.pageIndex)
    console.log(this.paginator.pageSize)
    console.log(from)
   console.log(to)

    this.dataSource.loadCC(1, 10,this.searchText);
    this.selection.clear();
  }

  // archiveTask(taskId: number) {
  //   const _title: string = this.translate.instant('ARCHIVE TASK');
  //   const _description: string = this.translate.instant('Do you want to archive this Task?');
  //   const _waitDesciption: string = this.translate.instant('Task is archiving...');
  //   const _successMessage = this.translate.instant('Task has been Archived');

  //   const dialogRef = this.layoutUtilsService.confirmElement(_title, _description, _waitDesciption, 'Yes');
  //   dialogRef.afterClosed().subscribe(res => {
  //     if (!res) {
  //       return;
  //     }
  //     this.taskService.archiveTask(taskId, true)
  //       .pipe(map(res => {
  //         if (res.Status == 200) {
  //           this.toastrService.success(_successMessage);
  //           this.selection.clear();
  //           this.dataSource.loadCC(1, 10, '', this.userData.userId, false, this.userIds,'','');
  //         }
  //       }))
  //       .subscribe();
  //   });
  // }

  // acceptTask(taskId: number) {
  //   const _successMessage = this.translate.instant('Task Accepted Successfully');
  //   this.taskService.acceptTask(taskId)
  //     .pipe(map(res => {
  //       if (res.Status == 200) {
  //         this.toastrService.success(_successMessage);
  //         this.selection.clear();
  //         this.dataSource.loadCC(1, 10, '', this.userData.userId, false, this.userIds,'','');
  //       }
  //     }))
  //     .subscribe();
  // }

  viewTaskCoverage(taskId: number) {
    this.dialog.open(ViewTaskCoverageComponent, { data: taskId, width: '30rem',height:'30rem' })
  }

  ViewTaskDetails(taskId: number, isCC: boolean){
    const params = {
      taskId: taskId,
      isCC: isCC
    }
    const dialogRef = this.dialog.open(ViewTaskDetailsComponent, { data: params, width: '1100px' });
  }
  

  // completeTask(taskId: number) {
  //   const _title: string = this.translate.instant('COMPLETE TASK');
  //   const _description: string = this.translate.instant('Are you sure this Task is complete?');
  //   const _waitDesciption: string = this.translate.instant('Task is updating...');
  //   const _successMessage = this.translate.instant('Task Completed Successfully');

  //   const dialogRef = this.layoutUtilsService.confirmElement(_title, _description, _waitDesciption, 'Yes');
  //   dialogRef.afterClosed().subscribe(res => {
  //     if (!res) {
  //       return;
  //     }
  //     this.taskService.completeTask(taskId)
  //       .pipe(map(res => {
  //         if (res.Status == 200) {
  //           this.toastrService.success(_successMessage);
  //           this.selection.clear();
  //           this.dataSource.loadCC(1, 10, '', this.userData.userId, false, this.userIds,'','');
  //         }
  //       }))
  //       .subscribe();
  //   });
  // }

  // partialComplete(taskId: number, completePercentage: number) {
  //   const _successMessage = this.translate.instant('Partial Complete Task Updated Successfully');
  //   const params = {
  //     TaskId: taskId,
  //     TaskStatusValue: completePercentage
  //   }
  //   const dialogRef = this.dialog.open(PartialCompleteDialogComponent, { data: params, width: '450px' });
  //   dialogRef.afterClosed().subscribe(res => {
  //     if (!res)
  //       return
  //     this.toastrService.success(_successMessage);
  //     this.dataSource.loadCC(1, 10, '', this.userData.userId, false, this.userIds,'','');
  //   })
  // }

  // deleteTask(taskId: number) {
  //   const _title: string = this.translate.instant('DELETE TASK');
  //   const _description: string = this.translate.instant('Do you want to delete this Task?');
  //   const _waitDesciption: string = this.translate.instant('Task is deleting...');
  //   const _successMessage = this.translate.instant('Task Deleted Successfully');

  //   const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
  //   dialogRef.afterClosed().subscribe(res => {
  //     if (!res) {
  //       return;
  //     }
  //     this.taskService.deleteTask(taskId)
  //       .pipe(map(res => {
  //         if (res.Status == 200) {
  //           this.toastrService.success(_successMessage);
  //           this.selection.clear();
  //           this.dataSource.loadCC(1, 10, '', this.userData.userId, false, this.userIds,'','');
  //         }
  //       }))
  //       .subscribe();
  //   });
  // }

  // showTaskDetails(taskId: number, isCC: boolean){
  //   const params = {
  //     taskId: taskId,
  //     isCC: isCC
  //   }
  //   const dialogRef = this.dialog.open(TaskDetailsDialogComponent, { data: params, width: '1100px' });
  // }

  // ngOnDestroy() {
  //   this.subscriptions.forEach(el => el.unsubscribe());
  // }

  // checkDate(dueDate, dueType) {
  //   let due = new Date(dueDate);
  //   let currentDate = new Date();
  //   currentDate.setHours(0, 0, 0, 0);
  //   due.setHours(0, 0, 0, 0);
  //   if (dueType == 'overdue') {
  //     if (due < currentDate) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   } else if (dueType == 'duetoday') {
  //     if (due.getTime() === currentDate.getTime()) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // }



 
}




