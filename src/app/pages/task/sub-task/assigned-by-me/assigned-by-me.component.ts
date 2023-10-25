import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, merge } from 'rxjs';
import { distinctUntilChanged, map, skip, tap } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material/material.module';
import { TaskDataSource } from 'src/app/shared/task/datasource/task.datasource';
import { TaskService } from 'src/app/shared/task/service/task.service';
import { ViewTaskDetailsComponent } from '../view-task-details/view-task-details.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { ToastrService } from 'ngx-toastr';
import { ArchiveDialogComponent } from '../archive-dialog/archive-dialog.component';
import { ViewTaskCoverageComponent } from '../view-task-coverage/view-task-coverage.component';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { TaskModel } from 'src/app/shared/task/datasource/task.model';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { TaskComponent } from '../../task.component';



@Component({
  selector: 'app-assigned-by-me',
  templateUrl: './assigned-by-me.component.html',
  styleUrls: ['./assigned-by-me.component.scss']
})
export class AssignedByMeComponent implements OnInit {

  dataSource!: TaskDataSource;
  displayedColumns = ['Title', 'CustomerName', 'AssignedBy', 'AssignedDate', 'DueDate', 'Priority', 'Status', 'Action'];

  // @Input() userData;
  // @Input() searchData;
  // @Input() filterData = {
  //   IsArchive: '',
  //   Priority: '',
  //   UserId: '',
  //   UserIds: [],
  //   From: 1,
  //   To: 10,
  //   Title: '',
  //   StatusIds: '',
  //   FromDate: '',
  //   ToDate: '',
  //   Sort: '',
  //   SortColumn: '',
  //   SortOrder: ''
  // }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Input() searchValue: any
  filterStatus: string = '';
  filterType: string = '';
  selection = new SelectionModel<TaskModel>(true, []);
  taskResult: TaskModel[] = [];
  private subscriptions: Subscription[] = [];
  taskStatusList: any = [];
  searchText: string = '';
  userIds = [];
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
    SortOrder: '',

  };
  FromDate = '';
  ToDate = '';
  assignedDateSortArrow = "../../../../../../assets/media/icons/sort.svg";
  dueDateSortArrow = "../../../../../../assets/media/icons/sort.svg";
  sortType: number = 0;
  // lrmId: number;
  customerStatusList = [];
  // userName;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    public datePipe: DatePipe,
    // private translate: TranslateService,
    private taskService: TaskService,
    private toastrService: ToastrService,
    // private layoutUtilsService: LayoutUtilsService,
    private authService: AuthService,
    // private customDatePipe: CustomDatePipe,
    // private customersService: CustomersService,
    private chRef: ChangeDetectorRef,
    private obj: TaskComponent


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
    this.dataSource.loadAssignedByMe(1, 10, this.searchText);
    this.taskService.load.subscribe(
      res => {
        if (res) {
          this.loadAssignedPage();
        }
      }
    )



    this.obj.search$.subscribe((res: any) => {
      this.searchText = res;
      this.loadAssignedPage()
    })




  }




  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchData) {
      // this.searchText = changes.searchData.currentValue;
      if (changes.searchData.currentValue != '') {
        this.paginator.pageIndex = 0;
        this.loadAssignedPage();
      }
      if (changes.searchData.currentValue == '' && !changes.searchData.firstChange) {
        // this.searchText = '';
        this.paginator.pageIndex = 0;
        this.loadAssignedPage();
      }
    }
  }


 

  ngAfterViewInit() {
    const paginatorSubscriptions = merge(this.paginator.page).pipe(
      tap(() => this.loadAssignedPage())
    )
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);
  }

  loadAssignedPage() {
    this.selection.clear();
    if (this.paginator.pageIndex < 0 || this.paginator.pageIndex > (this.paginator.length / this.paginator.pageSize))
      return;
    let from = ((this.paginator.pageIndex * this.paginator.pageSize) + 1);
    let to = ((this.paginator.pageIndex + 1) * this.paginator.pageSize);
    console.log(this.searchText)

    this.dataSource.loadAssignedByMe(from, to, this.searchText);
    this.selection.clear();
  }



  ViewTaskDetails(taskId: number, isCC: boolean) {
    const params = {
      taskId: taskId,
      isCC: isCC
    }
    const dialogRef = this.dialog.open(ViewTaskDetailsComponent, { data: params, width: '1100px' });
  }

  viewCoverage(taskId: number) {
    this.dialog.open(ViewTaskCoverageComponent, { data: taskId, width: '30rem', height: '15rem' })
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

          this.dataSource.loadAssignedByMe(1, 10, this.searchText);

        }))
        .subscribe();
    });
  }


  archiveTask(taskId: number) {
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

            this.dataSource.loadAssignedByMe(1, 10, this.searchText);
          }
        }))
        .subscribe();
    });
  };

}




























