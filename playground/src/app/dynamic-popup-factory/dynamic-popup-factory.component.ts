import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild
} from '@angular/core';
import {Subject} from 'rxjs';
import {DynamicPopupFactoryDialogRef} from './dynamic-popup-factory-dialog-ref';
import {DynamicPopupFactoryInsertionDirective} from "./dynamic-popup-factory-insertion.directive";

@Component({
  selector: 'app-twk-popup',
  templateUrl: './dynamic-popup-factory.component.html',
  styleUrls: ['./dynamic-popup-factory.component.scss']
})
export class DynamicPopupFactoryComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;

  @ViewChild(DynamicPopupFactoryInsertionDirective)
  insertionPoint: DynamicPopupFactoryInsertionDirective;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  childComponentType: Type<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef, private dialogRef: DynamicPopupFactoryDialogRef) {}

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this._onClose.next();
  }
}
