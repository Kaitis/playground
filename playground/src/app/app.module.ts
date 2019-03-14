import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ExampleComponent} from "./example.component";
import {DynamicPopupFactoryModule} from "./dynamic-popup-factory/dynamic-popup-factory.module";
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {DynamicTableComponent} from './dynamic-table/dynamic-table.component';
import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    AppComponent, ExampleComponent, DynamicFormComponent, DynamicTableComponent
  ],
  imports: [
    BrowserModule,
    DynamicPopupFactoryModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ExampleComponent, DynamicFormComponent]
})
export class AppModule { }
