import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

import { fromEvent, merge, Subscription } from 'rxjs';
import { distinctUntilChanged, map, skip, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { TaskDataSource } from 'src/app/shared/task/datasource/task.datasource';
import { TaskModel } from 'src/app/shared/task/datasource/task.model';
import { TaskService } from 'src/app/shared/task/service/task.service';
import { ViewTaskDetailsComponent } from '../view-task-details/view-task-details.component';
import { ArchiveDialogComponent } from '../archive-dialog/archive-dialog.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { ViewTaskCoverageComponent } from '../view-task-coverage/view-task-coverage.component';
import { PartialTaskCompleteDialogComponent } from '../partial-task-complete-dialog/partial-task-complete-dialog.component';
import { CompleteTaskComponent } from '../complete-task/complete-task.component';
import { DatePipe } from '@angular/common';
import { TaskComponent } from '../../task.component';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit {

  dataSource!: TaskDataSource;
  displayedColumns = ['Title','CustomerName','AssignedBy','AssignedDate','DueDate','Priority','Status','Action'];
  sortedData: any;
  // socket = io();
  @Input() userData: { userId: any; } | undefined;
  @Input() taskAdded: any;
  @Input() searchValue: any;
  @Input() filterData = {
    IsArchive: '',
    Priority: '',
    UserId: '',
    UserIds: [],
    From: 1,
    To: 10,
    Title: '',
    StatusIds: '',
    FromDate: '',
    ToDate: '',
    Sort: '',
    SortColumn: '',
    SortOrder: ''
  }
  Data = {
    IsArchive: '',
    Priority: '',
    UserId: '',
    UserIds: [],
    From: '',
    To: '',
    Title: '',
    StatusIds: '',
    FromDate: '',
    ToDate: '',
    Sort: '',
    SortColumn: '',
    SortOrder: ''
  };
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @Output() multiActionSelect = new EventEmitter<boolean>();
  @Output() reloadFalse = new EventEmitter<boolean>();
  filterStatus: string = '';
  filterType: string = '';
  selection = new SelectionModel<TaskModel>(true, []);
  taskResult: TaskModel[] = [];
  private subscriptions: Subscription[] = [];
  taskStatusList: any = [];
  multiAction: boolean = false;
  searchText : any;
  FromDate = '';
  ToDate = '';
  assignedDateSortArrow = "../../../../../../assets/media/icons/sort.svg";
  dueDateSortArrow = "../../../../../../assets/media/icons/sort.svg";
  sortType: number = 0;
 
  customerStatusList = [];

  constructor(
    public dialog: MatDialog,
    // public snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private taskService: TaskService,
   
		private authService: AuthService,
    private toastr: ToastrService,
    private toastrService: ToastrService,
  
    private chRef: ChangeDetectorRef,
    private obj:TaskComponent


 
  
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
     this.dataSource.loadMyTask(1, 10,'');
	 this.taskService.load.subscribe(
		res=> {
			if(res){
				this.loadTaskPage();
			}
		}
	)




  
  this.obj.search$.subscribe((res: any) => {
    this.searchText = res;
    this.loadTaskPage()
  })
   
  }


  ngAfterViewInit() {
    const paginatorSubscriptions = merge(this.paginator.page).pipe(
      tap(() => this.loadTaskPage())
    )
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);
  }


  ViewTaskDetails(taskId: number, isCC: boolean){
    const params = {
      taskId: taskId,
      isCC: isCC
    }
    const dialogRef = this.dialog.open(ViewTaskDetailsComponent, { data: params, width: '1100px' });
  }
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchData) {

      if (changes.searchData.currentValue != '') {
        this.searchText = changes.searchData.currentValue;
        this.paginator.pageIndex = 0;
        this.loadTaskPage();
      }
      if (changes.searchData.currentValue == '' && !changes.searchData.firstChange) {
        this.searchText = '';
        this.paginator.pageIndex = 0;
        this.loadTaskPage();
      }

    }

      if (changes.taskAdded.currentValue == true && changes.taskAdded) {
        this.loadTaskPage();
        this.reloadFalse.emit(false);
      }
  }


  // ngDoCheck() {
  //   if (this.Data.UserIds !== this.filterData.UserIds ||
  //     this.Data.StatusIds !== this.filterData.StatusIds ||
  //     this.Data.Priority !== this.filterData.Priority ||
  //     this.Data.FromDate !== this.filterData.FromDate ||
  //     this.Data.ToDate !== this.filterData.ToDate
  //   ) {
  //     if (this.filterData.FromDate !== '') {
  //       this.FromDate = this.customDatePipe.transform(this.filterData.FromDate, 0, 'MM/dd/yyyy')
  //     } else {
  //       this.FromDate = ''
  //     }
  //     if (this.filterData.ToDate !== '') {
  //       this.ToDate = this.customDatePipe.transform(this.filterData.ToDate, 0, 'MM/dd/yyyy')
  //     } else {
  //       this.ToDate = ''
  //     }
  //     this.dataSource.loadMyTask(this.filterData.From, this.filterData.To, this.filterData.Title, this.filterData.UserId, false, this.filterData.UserIds, this.filterData.Priority, this.filterData.StatusIds, this.FromDate, this.ToDate, this.filterData.SortColumn, this.filterData.SortOrder)
  //     this.Data.UserIds = this.filterData.UserIds;
  //     this.Data.StatusIds = this.filterData.StatusIds;
  //     this.Data.Priority = this.filterData.Priority;
  //     this.Data.FromDate = this.filterData.FromDate;
  //     this.Data.ToDate = this.filterData.ToDate;
  //   }
  // }

  // ngAfterViewInit() {
  //   const paginatorSubscriptions = merge(this.paginator.page).pipe(
  //     tap(() => this.loadTaskPage())
  //   )
  //     .subscribe();
  //   this.subscriptions.push(paginatorSubscriptions);
  // }

  // sortData(sort: Sort) {
  //   const data = this.taskResult.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'DueDate': return compare(a.TaskEndDate, b.TaskEndDate, isAsc);
  //       // case 'calories': return compare(a.calories, b.calories, isAsc);
  //       // case 'fat': return compare(a.fat, b.fat, isAsc);
  //       // case 'carbs': return compare(a.carbs, b.carbs, isAsc);
  //       // case 'protein': return compare(a.protein, b.protein, isAsc);
  //       default: return 0;
  //     }
  //   });
  //   this.socket.on('newMessage', function () {
  //     const data = [];
  //     data.push(this.sortedData);
  //     this.dataSource.data = data;
  //   });
  // }

  loadTaskPage() {
    this.selection.clear();
    if (this.paginator.pageIndex < 0 || this.paginator.pageIndex > (this.paginator.length / this.paginator.pageSize))
      return;
    let from = ((this.paginator.pageIndex * this.paginator.pageSize) + 1);
    let to = ((this.paginator.pageIndex + 1) * this.paginator.pageSize);

    this.dataSource.loadMyTask(from, to,this.searchText);
    this.selection.clear();
  }

 
 
  viewCoverage(taskId: number) {
    this.dialog.open(ViewTaskCoverageComponent, { data: taskId,  width: '30rem', height: '15rem' })
  }

 

  deleteTask(taskId: number) {
    const params = {
      taskId: taskId,
      IsArchive: true
    }
    const dialogRef = this.dialog.open(DeleteTaskComponent, { data: params, width: '1100px' });


  
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.taskService.deleteTask(taskId)
        .pipe(map(res => {
          
            this.toastr.success('success');
           
            this.dataSource.loadAssignedByMe(1, 10,'');
          
        }))
        .subscribe();
    });
  }


  archiveTask(taskId: number){
    const params = {
      taskId: taskId,
      IsArchive: true
    }
    const dialogRef = this.dialog.open(ArchiveDialogComponent, { data: params, width: '1100px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
      // if (!result) {
      //          return;
      //       }
            this.taskService.archiveTask(taskId, result)
              .pipe(map(res => {
               if (res.Status == 200) {
                  this.toastrService.success();
                 
                   this.dataSource.loadAssignedByMe(1, 10,'');
                }
              }))
              .subscribe();
         });
    };


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
  //           this.dataSource.loadMyTask(1, 10, '', this.userData.userId, false, '', '', '', '', '', '', '');

  //         }
  //       }))
  //       .subscribe();
  //   });
  // }

  // unarchiveTask(taskId: number) {
  //   const _title: string = this.translate.instant('UNARCHIVE TASK');
  //   const _description: string = this.translate.instant('Do you want to unarchive this Task?');
  //   const _waitDesciption: string = this.translate.instant('Task is unarchiving...');
  //   const _successMessage = this.translate.instant('Task Unarchived Successfully');

  //   const dialogRef = this.layoutUtilsService.confirmElement(_title, _description, _waitDesciption, 'Yes');
  //   dialogRef.afterClosed().subscribe(res => {
  //     if (!res) {
  //       return;
  //     }
  //     this.taskService.archiveTask(taskId, false)
  //       .pipe(map(res => {
  //         if (res.Status == 200) {
  //           this.toastrService.success(_successMessage);
  //           this.selection.clear();
  //           this.dataSource.loadMyTask(1, 10, '', this.userData.userId, true, '', '', '', '', '', '', '');
  //         }
  //       }))
  //       .subscribe();
  //   });
  // }

  acceptTask(taskId: number) {

    this.taskService.acceptTask(taskId)
      .pipe(map(res => {
     
          this.toastrService.success("success");
          this.selection.clear();
          this.dataSource.loadMyTask(1, 10,'');
        
      }))
      .subscribe();
  }

  completeTask(taskId: number) {
    const params = {
      taskId: taskId,
     
    }
    const dialogRef = this.dialog.open(CompleteTaskComponent, { data: params, width: '1100px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
      // if (!result) {
      //          return;
      //       }
            this.taskService.completeTask(taskId)
              .pipe(map(res => {
              
                  this.toastrService.success();
                 
                  this.dataSource.loadMyTask(1, 10,'');
                
              }))
              .subscribe();
         });
    // const _title: string = this.translate.instant('COMPLETE TASK');
    // const _description: string = this.translate.instant('Are you sure this Task is complete?');
    // const _waitDesciption: string = this.translate.instant('Task is updating...');
    // const _successMessage = this.translate.instant('Task Completed Successfully');

    // const dialogRef = this.layoutUtilsService.confirmElement(_title, _description, _waitDesciption, 'Yes');
    // dialogRef.afterClosed().subscribe(res => {
    //   if (!res) {
    //     return;
    //   }
    //   this.taskService.completeTask(taskId)
    //     .pipe(map(res => {
    //       if (res.Status == 200) {
    //         this.toastrService.success(_successMessage);
    //         this.selection.clear();
    //         this.dataSource.loadMyTask(1, 10, '', this.userData.userId, false, '', '', '', '', '', '', '');
		// 	// this.taskService.load.next(true)
    //       }
    //     }))
    //     .subscribe();
    // });
  }

  partialComplete(taskId: number, completePercentage: number) {
    // const _successMessage = this.translate.instant('Partial Complete Task Updated Successfully');
    const params = {
      TaskId: taskId,
      TaskStatusValue: completePercentage
    }
    const dialogRef = this.dialog.open(PartialTaskCompleteDialogComponent, { data: params, width: '450px' });
    dialogRef.afterClosed().subscribe(res => {
      if (!res)
        return
      this.toastrService.success("success");
      this.dataSource.loadMyTask(1, 10,'');
    })
  }

  // viewCoverage(taskId: number) {
  //   this.dialog.open(ViewTaskCoverageDialogComponent, { data: taskId, width: '400px' })
  // }

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
  //           this.dataSource.loadMyTask(1, 10, '', this.userData.userId, false, '', '', '', '', '', '', '');
	// 		// this.taskService.load.next(true)
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
  //     this.dataSource.loadMyTask(1, 10, '', this.userData.userId, false, '', '', '', '', '', '', '');
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
  //           this.dataSource.loadMyTask(1, 10, '', this.userData.userId, false, '', '', '', '', '', '', '');
  //         }
  //       }))
  //       .subscribe();
  //   });
  // }

  // showTaskDetails(taskId: number, isCC: boolean) {
  //   const params = {
  //     taskId: taskId,
  //     isCC: isCC
  //   }
  //   const dialogRef = this.dialog.open(TaskDetailsDialogComponent, { data: params, width: '1100px' });
  // }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

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

  // sort(type) {
  //   this.sortType += 1;
  //   this.filterData.SortColumn = type;
  //   if (this.sortType % 2 == 0) {
  //     this.filterData.SortOrder = 'asc';
  //     if (type === 'DueDate') {
  //       this.dueDateSortArrow = "../../../../../../assets/media/icons/uparrow.svg";
  //       this.assignedDateSortArrow = "../../../../../../assets/media/icons/sort.svg";
  //     } else {
  //       this.assignedDateSortArrow = "../../../../../../assets/media/icons/uparrow.svg";
  //       this.dueDateSortArrow = "../../../../../../assets/media/icons/sort.svg";
  //     }
  //     this.dataSource.loadMyTask(this.filterData.From, this.filterData.To, this.filterData.Title, this.filterData.UserId, false, this.filterData.UserIds, this.filterData.Priority, this.filterData.StatusIds, this.FromDate, this.ToDate, this.filterData.SortColumn, this.filterData.SortOrder)
  //   } else {
  //     this.filterData.SortOrder = 'desc';
  //     if (type === 'DueDate') {
  //       this.dueDateSortArrow = "../../../../../../assets/media/icons/downarrow.svg";
  //       this.assignedDateSortArrow = "../../../../../../assets/media/icons/sort.svg";
  //     } else {
  //       this.assignedDateSortArrow = "../../../../../../assets/media/icons/downarrow.svg";
  //       this.dueDateSortArrow = "../../../../../../assets/media/icons/sort.svg";
  //     }
  //     this.dataSource.loadMyTask(this.filterData.From, this.filterData.To, this.filterData.Title, this.filterData.UserId, false, this.filterData.UserIds, this.filterData.Priority, this.filterData.StatusIds, this.FromDate, this.ToDate, this.filterData.SortColumn, this.filterData.SortOrder)
  //   }
  // }

 /// CUSTOMER TIME LINE START//

  /**
   * get customer status
   */
  //  getCustomerStatus() {
  //   this.customersService.getCustomerStatus()
  //     .pipe(
  //       map(res => {
  //         if (res != '') {
  //           this.customerStatusList = res;
  //           this.chRef.detectChanges();
  //         }
  //       })
  //     )
  //     .subscribe();
  // }

  

  //END////
}
