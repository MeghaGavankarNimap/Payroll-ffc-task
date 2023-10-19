import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customText'
})
export class CustomTextPipe implements PipeTransform {

  transform(objectValue: any, text: any): any {
		return objectValue[text];
	}

}
