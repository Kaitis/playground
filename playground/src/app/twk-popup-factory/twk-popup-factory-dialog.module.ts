import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TwkPopupFactoryDialogComponent} from "./twk-popup-factory-dialog.component";
import {TwkPopupFactoryInsertionDirective} from "./twk-popup-factory-insertion.directive";
import {MatButtonModule, MatDialogModule, MatIconModule} from "@angular/material";


@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  declarations: [TwkPopupFactoryDialogComponent, TwkPopupFactoryInsertionDirective],
  entryComponents: [TwkPopupFactoryDialogComponent]
})
export class TwkPopupFactoryDialogModule {}
