import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/base/guards/auth.guard';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent,
      
			},
		]),

  ]
})
export class DashboardModule { }
