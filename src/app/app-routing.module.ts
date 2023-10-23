import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './base/guards/auth.guard';

const routes: Routes = [
  {
		path: '', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule),
		canActivate: []
	},
  {
		path: 'pages', loadChildren: () => import('../app/pages/pages.module').then(m => m.PagesModule),
		canActivate: [AuthGuard],
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
