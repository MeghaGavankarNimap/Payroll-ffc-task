import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { count } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TotalRecordsService {

  private countSource = new BehaviorSubject(0);
  currentCount = this.countSource.asObservable();

  constructor() { }

  getTotalRecords(count: number) {
    this.countSource.next(count)
    
  }
    
  }
