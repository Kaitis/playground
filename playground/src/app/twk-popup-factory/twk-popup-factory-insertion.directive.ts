import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[twkPopupInsertion]'
})
export class TwkPopupFactoryInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
