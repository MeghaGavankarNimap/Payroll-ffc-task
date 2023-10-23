import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  load = new BehaviorSubject<boolean>(false)
  $load = this.load.asObservable();
  userDetails:any

  constructor( private http:HttpClient) { }


  MembersList(from:any,to:any,text:any){
  
    return this.http.get('api/CompanyMembers?from=' + from + '&text=' + text + '&to=' + to)
      .pipe(
        map(res => res)
      );

  }


  private imageDataSubject = new BehaviorSubject<string | null>(null);
  imageData$ = this.imageDataSubject.asObservable();

  setImage(imageData: string) {
    this.imageDataSubject.next(imageData);
  }


  CustomerList(params: { From: number; To: number; Text: string; }): Observable<any> {
    return this.http.post('api/CRM/Leads', params)
      .pipe(map(
        res => res
      ))
  }

  addTask(taskDetails:any): Observable<any> {
    return this.http.post('api/Task/AssignTask', taskDetails)
   
      .pipe(
        map(res => res)
      );
  }



  findCC(from:number, to:number,title: string): Observable<any> {
    const userDetailsJson = localStorage.getItem('userdetails');
    this.userDetails = JSON.parse(userDetailsJson||'');
    console.log(this.userDetails.UserId)
   let id = this.userDetails.UserId;
    const params = {
      From: from,
      To: to,
      Title: title,
      UserId: id,
      IsArchive: false,
      UserIds: [],
      TaskStatus: '',
      Priority: ''
    }
    return this.http.post('api/Task/OwnerTasks', params)
      .pipe(
        map(res => res)
      );
  }
  

 
 
  archiveTask(taskId: number, isArchive: boolean): Observable<any> {
    const params = {
      IsArchive: isArchive,
      TaskId: taskId
    }
    return this.http.post('api/Task/Archive', params)
      .pipe(
        map(res => res)
      );
  }  

 

  findAssignedByMe(from: number, to: number,title: string): Observable<any> {
    console.log(title)
    const userDetailsJson = localStorage.getItem('userdetails');
    this.userDetails = JSON.parse(userDetailsJson||'');
    console.log(this.userDetails.UserId)
   let id = this.userDetails.UserId;

    const params = {
      From: from,
      To: to,
      Title: title,
      UserId: id,
      IsArchive: false,
      UserIds: [],
      Priority: '',
      TaskStatus: '',
      FromDueDate: '',
      ToDueDate: '',
      SortByDueDate: '',
      
    }
    return this.http.post('api/Task/UserTasksAssignedByMe', params)
      .pipe(
        map(res => res)
      );
  }


  
  findArchiveList(from: number, to: number,title:string): Observable<any> {
    const userDetailsJson = localStorage.getItem('userdetails');
    this.userDetails = JSON.parse(userDetailsJson||'');
    console.log(this.userDetails.UserId)
   let id = this.userDetails.UserId;

    const params = {
      From: from,
      To: to,
      Title: '',
      UserId: id,
      IsArchive: false,
      UserIds: []
    }
    return this.http.post('api/Task/UserTasksAssignedByMe', params)
      .pipe(
        map(res => res)
      );
  }

  findMyTask(from: number, to: number,title:string): Observable<any> {
    const userDetailsJson = localStorage.getItem('userdetails');
    this.userDetails = JSON.parse(userDetailsJson||'');
    console.log(this.userDetails.UserId)
   let id = this.userDetails.UserId;
    const params = {
      From: from,
      To: to,
      Title: title,
      UserId: '',
      IsArchive: false,
      UserIds: [],
      Priority: '',
      TaskStatus: '',
      FromDueDate: '',
      ToDueDate: '',
      SortByDueDate: '',
      // SortColumn: SortColumn,
      // SortOrder: SortOrder
    }
    return this.http.post('api/Task/UserTasksAssignedToMe', params)
      .pipe(
        map(res => res)
      );
  }



 TaskCoverage(taskId: number): Observable<any> {
    return this.http.get('api/Task/StatusReport?taskId=' + taskId)
      .pipe(
        map(res => res)
      );
  }


  getTaskDetails(taskId: number): Observable<any> {
    return this.http.get('api/Task/UserTaskDetails?taskId=' + taskId)
      .pipe(
        map(res => res)
      );
  }



  acceptTask(taskId: number): Observable<any> {
    const params = {
      TaskId: taskId,
      TaskStatusValue: 0
    }
    return this.http.post('api/Task/UpdateTaskStatus', params)
      .pipe(
        map(res => res)
      );
  }
  
  deleteTask(taskId: number): Observable<any> {
    return this.http.get('api/Task/DeleteTask?taskId=' + taskId)
      .pipe(
        map(res => res)
      );
  }

  getPartialCompleteStatus(): Observable<any> {
    return this.http.get('api/Task/UserTaskStatusMaster')
      .pipe(
        map(res => res)
      );
  }

  partialCompleteTask(taskId: number, taskStatusValue: number): Observable<any> {
    const params = {
      TaskId: taskId,
      TaskStatusValue: taskStatusValue
    }
    return this.http.post('api/Task/UpdateTaskStatus', params)
      .pipe(
        map(res => res)
      );
  }


  completeTask(taskId: number): Observable<any> {
    const params = {
      TaskId: taskId,
      TaskStatusValue: 100
    }
    return this.http.post('api/Task/UpdateTaskStatus', params)
      .pipe(
        map(res => res)
      );
  }



  
  
}
