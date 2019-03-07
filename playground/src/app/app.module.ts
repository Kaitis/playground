import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ExampleComponent} from "./example.component";
import {TwkPopupFactoryDialogModule} from "./twk-popup-factory/twk-popup-factory-dialog.module";
import {MatButtonModule, MatDialogModule, MatIconModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";

@NgModule({
  declarations: [
    AppComponent, ExampleComponent
  ],
  imports: [
    BrowserModule, TwkPopupFactoryDialogModule, MatDialogModule, MatButtonModule,MatIconModule,BrowserAnimationsModule, FormsModule, ReactiveFormsModule,  NgxDaterangepickerMd.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ExampleComponent]
})
export class AppModule { }
