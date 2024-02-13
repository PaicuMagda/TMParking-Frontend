import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverElement]',
})
export class HoverElementDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.addHoverListenerStyles();
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.removeHostListenerStyles();
  }

  private addHoverListenerStyles() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'transform',
      'scale(1.1)'
    );
    this.renderer.setStyle(
      this.element.nativeElement,
      'box-shadow',
      '7px 7px 7px 7px rgba(0,0,1,0.75)'
    );
  }

  private removeHostListenerStyles() {
    this.renderer.removeStyle(this.element.nativeElement, 'box-shadow');
    this.renderer.removeStyle(this.element.nativeElement, 'transform');
  }
}
