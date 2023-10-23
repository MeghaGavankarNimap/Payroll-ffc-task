import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddMembersComponent } from './add-members/add-members.component';
import { TaskService } from 'src/app/shared/task/service/task.service';
import { UploadFileComponent } from './upload-file/upload-file.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { CustomPipePipe } from 'src/app/base/pipes/custom-pipe.pipe';
import { TaskComponent } from './task.component';
import { CCComponent } from './sub-task/cc/cc.component';
import { MyTaskComponent } from './sub-task/my-task/my-task.component';
import { AssignedByMeComponent } from './sub-task/assigned-by-me/assigned-by-me.component';
import { ArchiveListComponent } from './sub-task/archive-list/archive-list.component';
import { ViewTaskCoverageComponent } from './sub-task/view-task-coverage/view-task-coverage.component';
import { ViewTaskDetailsComponent } from './sub-task/view-task-details/view-task-details.component';
import { ArchiveUnarchiveComponent } from './sub-task/archive-unarchive/archive-unarchive.component';
import { DeleteTaskComponent } from './sub-task/delete-task/delete-task.component';
import { ArchiveDialogComponent } from './sub-task/archive-dialog/archive-dialog.component';
import { UnarchiveDialogComponent } from './sub-task/unarchive-dialog/unarchive-dialog.component';
import { ViewImageDialogComponent } from './sub-task/view-image-dialog/view-image-dialog.component';
import { AssignToOthersComponent } from './assign-to-others/assign-to-others.component';
import { AssignToMeComponent } from './assign-to-me/assign-to-me.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PartialTaskCompleteDialogComponent } from './sub-task/partial-task-complete-dialog/partial-task-complete-dialog.component';
import { CompleteTaskComponent } from './sub-task/complete-task/complete-task.component';
import { TabConditionComponent } from './tab-condition/tab-condition.component';





const routes: Routes = [
	{
		path: "",
		component: TaskComponent,
		children: [
			{
				path: "",
				component: TaskComponent,
			},
		],
	},
];






@NgModule({
  declarations: [
    TaskListComponent,
    AddTaskComponent,
    AddMembersComponent,
    UploadFileComponent,
    TaskComponent,
    CCComponent,
    MyTaskComponent,
    AssignedByMeComponent,
    ArchiveListComponent,
    ViewTaskCoverageComponent,
    ViewTaskDetailsComponent,
    ArchiveUnarchiveComponent,
    DeleteTaskComponent,
    ArchiveDialogComponent,
    UnarchiveDialogComponent,
    ViewImageDialogComponent,
    AssignToOthersComponent,
    AssignToMeComponent,
    PartialTaskCompleteDialogComponent,
    CompleteTaskComponent,
    TabConditionComponent
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    // RouterModule.forChild([
    //   {
    //     path: 'tabs',
    //     component: AddTaskComponent,
    //     children: [
    //       {
    //         path: 'tab1',
    //         component: AddTaskComponent,
    //       },
    //       {
    //         path: 'tab2',
    //         component: AddTaskComponent,
    //         canDeactivate: [], 
    //       },
    //     ],
    //   },
      
		// ]),

    
    
    RouterModule.forChild([
			{
				path: '',
				component: TaskComponent
			},
      {
				path: 'add-task',
				component: AddTaskComponent
			},
      {
				path: 'add-members',
				component: AddMembersComponent
			},
      {
				path: 'upload',
				component: UploadFileComponent
			},
      {
				path: 'my-task',
				component: MyTaskComponent
			},
		]),
   
    
  ],
  providers: [AuthService,CustomPipePipe,DatePipe
     ],
})
export class TaskModule { }
