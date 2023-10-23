import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  ngOnInit(): void {

  }
  constructor(public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
      private chRef: ChangeDetectorRef,
    ) { }
// @ViewChild('searchInput',{static:true}) searchInput: any;

@ViewChild('input') input!: ElementRef;



search$ = new Subject();




  openDialog(): void {
   
    const filterData = {
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
    }
  
   
    const dialogRef = this.dialog.open(AddTaskComponent, {
      
      width: '45rem',
      height: '30rem'

    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }


  // onTabChanged(tabChangeEvent: MatTabChangeEvent): void {
  //   this.searchInput.nativeElement.value = '';
   
  //   this.chRef.detectChanges();
  // }

  logout(){
    this.authService.isLoggedOut();
  }



ngAfterViewInit() {
    // server-side search
fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap((inputElement: any) => {
          this.search$.next(inputElement.target.value);

        })
    )
    .subscribe();
}
}
