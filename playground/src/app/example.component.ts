import {Component} from '@angular/core';
import {DynamicPopupFactoryConfig} from "./dynamic-popup-factory/dynamic-popup-factory-config";
import {DynamicPopupFactoryDialogRef} from "./dynamic-popup-factory/dynamic-popup-factory-dialog-ref";


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  constructor(public config: DynamicPopupFactoryConfig, public dialog: DynamicPopupFactoryDialogRef) {}

  onClose(param:any) {
    this.dialog.close(param);
  }

  log(param:any){
    console.log("Action call: " + param)
  }

  call(event) {
    console.log(event);
    let methodName = event.methodName;

    if(this[methodName]) {
      // method exists on the component
      let param = event.methodParam;
      if(param !== undefined)
        this[methodName](param); // call it
      else
        this[methodName](); // call it
    }
  }
}
