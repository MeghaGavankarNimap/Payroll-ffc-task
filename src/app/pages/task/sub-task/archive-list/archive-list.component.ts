import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, merge, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { distinctUntilChanged, map, skip, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { TaskDataSource } from 'src/app/shared/task/datasource/task.datasource';
import { TaskService } from 'src/app/shared/task/service/task.service';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/material/material.module';
import { ViewTaskDetailsComponent } from '../view-task-details/view-task-details.component';
import { ArchiveUnarchiveComponent } from '../archive-unarchive/archive-unarchive.component';
import { DatePipe } from '@angular/common';
import { TaskComponent } from '../../task.component';



@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.scss']
})
export class ArchiveListComponent implements OnInit {

  dataSource!: TaskDataSource;
  displayedColumns = ['Title','CustomerName', 'AssignedBy', 'AssignedDate', 'DueDate', 'Priority', 'Status', 'Action'];
  title:any
  @Input() userData: { userId: any; } | undefined;
  @Input() searchValue: any;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  filterStatus: string = '';
  filterType: string = '';
  // selection = new SelectionModel<TaskModel>(true, []);
  // taskResult: TaskModel[] = [];
  private subscriptions: Subscription[] = [];
  taskStatusList: any = [];
  searchText :any;
  userIds = [];
  lrmId: number | undefined;
  customerStatusList = [];
  userName: any;
  taskResult: any[] | undefined;
  selection: any;

  constructor(
    public dialog: MatDialog,
    // public snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private taskService: TaskService,
    private toastrService: ToastrService,
		private authService: AuthService,
    private obj:TaskComponent,
  
  
    private chRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    

    // 
    this.dataSource = new TaskDataSource(this.taskService);
    const entitiesSubscription = this.dataSource.entitySubject.pipe(
      skip(1),
      distinctUntilChanged()
    ).subscribe(res => {
      this.taskResult = res;
    });
    this.subscriptions.push(entitiesSubscription);
    this.dataSource.loadArchive(1, 10, this.searchText);
    this.taskService.load.subscribe(
      res=> {
        if(res){
          this.loadArchivePage();
        }
      }
    )



    this.obj.search$.subscribe((res: any) => {
      this.searchText = res;
      this.loadArchivePage()
    })




			
  }

  showTaskDetails(taskId: number, isCC: boolean){
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
        this.loadArchivePage();
      }
      if (changes.searchData.currentValue == '' && !changes.searchData.firstChange) {
        this.searchText = '';
        this.paginator.pageIndex = 0;
        this.loadArchivePage();
      }
    }
  }

  ngAfterViewInit() {
    const paginatorSubscriptions = merge(this.paginator.page).pipe(
      tap(() => this.loadArchivePage())
    )
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);
  }

  loadArchivePage() {
   
    if (this.paginator.pageIndex < 0 || this.paginator.pageIndex > (this.paginator.length / this.paginator.pageSize))
      return;
    let from = ((this.paginator.pageIndex * this.paginator.pageSize) + 1);
    let to = ((this.paginator.pageIndex + 1) * this.paginator.pageSize);

    this.dataSource.loadArchive(from, to,this.searchText);
   
  }

  unarchiveTask(taskId: number){
    const params = {
      taskId: taskId,
      IsArchive: false
    }
    const dialogRef = this.dialog.open(ArchiveUnarchiveComponent, { data: params, width: '1100px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
      // if (!result) {
      //          return;
      //       }
            this.taskService.archiveTask(taskId, result)
              .pipe(map(res => {
               if (res.Status == 200) {
                  this.toastrService.success();
                 
                   this.dataSource.loadAssignedByMe(1, 10,this.searchText);
                }
              }))
              .subscribe();
         });
    };
  }
  
  
