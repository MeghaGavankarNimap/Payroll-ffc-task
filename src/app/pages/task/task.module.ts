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



// const routes: Routes = [
// 	{
// 		path: "",
// 		component: TaskComponent,
// 		children: [
// 			{
// 				path: "",
// 				component: TaskComponent,
// 			},
// 		],
// 	},
// ];






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
    ArchiveListComponent
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'my-task',
        pathMatch: 'full'
      },
			{
				path: 'my-task',
				component: TaskComponent
			},
		]),
   
    // RouterModule.forChild([
		// 	{
		// 		path: 'task-list',
		// 		component: TaskListComponent
		// 	},
    //   {
		// 		path: 'add-task',
		// 		component: AddTaskComponent
		// 	},
    //   {
		// 		path: 'add-members',
		// 		component: AddMembersComponent
		// 	},
    //   {
		// 		path: 'upload',
		// 		component: UploadFileComponent
		// 	},
		// ]),
   
    
  ],
  providers: [AuthService,CustomPipePipe,DatePipe
     ],
})
export class TaskModule { }
