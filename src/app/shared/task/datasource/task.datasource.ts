import { catchError, finalize } from 'rxjs/operators';
// RxJS
import { map } from 'rxjs/operators';
// CRUD

import { BehaviorSubject, of } from 'rxjs';

import { BaseDataSource } from './base.datasource';
import { TaskService } from '../service/task.service';

export class TaskDataSource extends BaseDataSource {
	
	private loadingSubject = new BehaviorSubject<boolean>(false);
	private isPreloadTextViewedSubject = new BehaviorSubject<boolean>(true);

	public loading$ = this.loadingSubject.asObservable();
	public isPreloadTextViewed$ = this.isPreloadTextViewedSubject.asObservable();

	constructor(private taskService: TaskService) {
		super();
	}
    

	loadMyTask(from:number, to:number,title:''){
		this.loadingSubject.next(true);

		this.taskService.findMyTask(from, to,title)
			.pipe(
				map(
					task => {
						this.paginatorTotalSubject.next(task.data.TotalCount);
						this.entitySubject.next(task.data.TaskList);
					}
				),
				catchError(() => of([])),
				finalize(() => {
					this.loadingSubject.next(false);
					this.isPreloadTextViewedSubject.next(false);
				})
			)
			.subscribe();
	}

	

	loadAssignedByMe(from:number, to:number,title: string){
		this.loadingSubject.next(true);
		console.log(title)
 
		this.taskService.findAssignedByMe(from, to,title)
			.pipe(
				map(
					task => {
						this.paginatorTotalSubject.next(task.data.TotalCount);
						this.entitySubject.next(task.data.TaskList);
					}
				),
				catchError(() => of([])),
				finalize(() => {
					this.loadingSubject.next(false);
					this.isPreloadTextViewedSubject.next(false);
				})
			)
			.subscribe();
	}


    loadCC(from:number, to:number,title:string){
		this.loadingSubject.next(true);

		this.taskService.findCC(from, to,title)
			.pipe(
				map(
					task => {
						this.paginatorTotalSubject.next(task.data.TotalCount);
						this.entitySubject.next(task.data.TaskList);
					}
				),
				catchError(() => of([])),
				finalize(() => {
					this.loadingSubject.next(false);
					this.isPreloadTextViewedSubject.next(false);
				})
			)
			.subscribe();
	}

	loadArchive(from:number, to:number,title:string){
		this.loadingSubject.next(true);

		this.taskService.findArchiveList(from, to,title)
			.pipe(
				map(
					task => {
						this.paginatorTotalSubject.next(task.data.TotalCount);
						this.entitySubject.next(task.data.TaskList);
					}
				),
				catchError(() => of([])),
				finalize(() => {
					this.loadingSubject.next(false);
					this.isPreloadTextViewedSubject.next(false);
				})
			)
			.subscribe();
	}
}