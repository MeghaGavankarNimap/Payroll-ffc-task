import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AuthGuard } from '../base/guards/auth.guard';
import { AuthInterceptor } from '../shared/auth/auth.interceptor';
import { CustomPipePipe } from '../base/pipes/custom-pipe.pipe';







const routes: Routes = [
  {
		path: 'dashboard', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [],
	},
  {
		path: 'task', loadChildren: () => import('../pages/task/task.module').then(m => m.TaskModule),
		canActivate: []
	},
];

@NgModule({
  declarations: [
  
   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
   
  ]
})
export class PagesModule { }
