import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { CustomPipePipe } from './pipes/custom-pipe.pipe';

import { CustomTextPipe } from './pipes/custom-text.pipe';





@NgModule({
  declarations: [
    NumbersOnlyDirective,
    CustomPipePipe,
    CustomTextPipe,
    CustomTextPipe,
  
    
  ],
  imports: [
    CommonModule
  ],
  
  exports:[
    NumbersOnlyDirective,
    CustomPipePipe,
    CustomTextPipe
   
  ],

  providers:    [ DatePipe ]

})
export class BaseModule { }
