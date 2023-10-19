import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';


@Directive({
  selector: 'input[numbersOnly]',
  exportAs:'numbersOnly'
})
export class NumbersOnlyDirective {

  constructor(private el:ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
