import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DynamicPopupFactoryComponent} from "./dynamic-popup-factory.component";
import {DynamicPopupFactoryInsertionDirective} from "./dynamic-popup-factory-insertion.directive";
import {MatButtonModule, MatDialogModule, MatIconModule} from "@angular/material";


@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  declarations: [DynamicPopupFactoryComponent, DynamicPopupFactoryInsertionDirective],
  entryComponents: [DynamicPopupFactoryComponent]
})
export class DynamicPopupFactoryModule {}
