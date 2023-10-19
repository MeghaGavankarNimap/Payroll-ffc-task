import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';










const routes: Routes = [
  {
		path: '', loadChildren: () => import('../auth/login/login.module').then(m => m.LoginModule),
	
	},
 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class AuthModule { }
