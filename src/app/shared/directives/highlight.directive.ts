import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // Para hacer modificaciones en el DOM
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
  }

  constructor(private element: ElementRef) {
    // this.element.nativeElement.style.backgroundColor = 'red';
  }
}
