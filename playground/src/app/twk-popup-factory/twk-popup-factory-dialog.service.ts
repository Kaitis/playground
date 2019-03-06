import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import {TwkPopupFactoryDialogModule} from './twk-popup-factory-dialog.module';
import {TwkPopupFactoryDialogComponent} from './twk-popup-factory-dialog.component';
import {TwkPopupFactoryDialogInjector} from './twk-popup-factory-dialog-injector';
import {TwkPopupFactoryDialogConfig} from './twk-popup-factory-dialog-config';
import {TwkPopupFactoryDialogRef} from './twk-popup-factory-dialog-ref';

@Injectable({
  providedIn: TwkPopupFactoryDialogModule
})
export class TwkPopupFactoryDialogService {
  dialogComponentRef: ComponentRef<TwkPopupFactoryDialogComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {}

  public open(componentType: Type<any>, config: TwkPopupFactoryDialogConfig) {
    const dialogRef = this.appendDialogComponentToBody(config);

    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  private appendDialogComponentToBody(config: TwkPopupFactoryDialogConfig) {
    const map = new WeakMap();
    map.set(TwkPopupFactoryDialogConfig, config);

    const dialogRef = new TwkPopupFactoryDialogRef();
    map.set(TwkPopupFactoryDialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TwkPopupFactoryDialogComponent);
    const componentRef = componentFactory.create(new TwkPopupFactoryDialogInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody();
    });

    return dialogRef;
  }

  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
