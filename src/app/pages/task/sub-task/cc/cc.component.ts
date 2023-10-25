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

  
  

  viewTaskCoverage(taskId: number) {
    this.dialog.open(ViewTaskCoverageComponent, { data: taskId,  width: '30rem', height: '15rem' })
  }

  ViewTaskDetails(taskId: number, isCC: boolean){
    const params = {
      taskId: taskId,
      isCC: isCC
    }
    const dialogRef = this.dialog.open(ViewTaskDetailsComponent, { data: params, width: '1100px' });
  }
  

  
  

  

  

  
  



 
}




