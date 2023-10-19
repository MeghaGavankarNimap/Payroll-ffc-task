import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HttpClient
  ],
  providers:[
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]

})
export class SharedModule { }
