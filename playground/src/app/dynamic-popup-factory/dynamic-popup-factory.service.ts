import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import {DynamicPopupFactoryModule} from './dynamic-popup-factory.module';
import {DynamicPopupFactoryComponent} from './dynamic-popup-factory.component';
import {DynamicPopupFactoryInjector} from './dynamic-popup-factory-injector';
import {DynamicPopupFactoryConfig} from './dynamic-popup-factory-config';
import {DynamicPopupFactoryDialogRef} from './dynamic-popup-factory-dialog-ref';

@Injectable({
  providedIn: DynamicPopupFactoryModule
})
export class DynamicPopupFactoryService {
  dialogComponentRef: ComponentRef<DynamicPopupFactoryComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {}

  public open(componentType: Type<any>, config: DynamicPopupFactoryConfig) {
    const dialogRef = this.appendDialogComponentToBody(config);

    this.dialogComponentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  private appendDialogComponentToBody(config: DynamicPopupFactoryConfig) {
    const map = new WeakMap();
    map.set(DynamicPopupFactoryConfig, config);

    const dialogRef = new DynamicPopupFactoryDialogRef();
    map.set(DynamicPopupFactoryDialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicPopupFactoryComponent);
    const componentRef = componentFactory.create(new DynamicPopupFactoryInjector(this.injector, map));

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
