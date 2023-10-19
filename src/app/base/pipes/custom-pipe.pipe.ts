import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {

  transform(date: Date | string, day: number, format: string = 'd MMM y'): string {
    if (!date) {
        return '';
    }

    date = new Date(date);  // if original type was a string
    date.setDate(date.getDate() - day);

    const customDate = new DatePipe('en-US').transform(date, format) as string; // Type assertion
     let newDateArray=[]
    if (customDate) {
      newDateArray.push(customDate);
    }

    return customDate;
  }
}
// By adding as string after the transform function call, you are telling TypeScript that you expect customDate to be a string and that it should not be null. This should resolve the type error you're encountering.






