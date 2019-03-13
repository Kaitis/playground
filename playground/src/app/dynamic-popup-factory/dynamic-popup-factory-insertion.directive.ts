import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[twkPopupInsertion]'
})
export class DynamicPopupFactoryInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
