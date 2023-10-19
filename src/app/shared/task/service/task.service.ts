import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

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
  
}
