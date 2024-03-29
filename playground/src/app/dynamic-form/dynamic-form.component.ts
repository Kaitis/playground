import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {timer} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() model;

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];

  submit(model) {
    console.log(model);
    this.dialogRef.close(model);
  }

  constructor(public dialogRef: MatDialogRef<DynamicFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {type: any}) { }

  ngOnInit() {
    this.fields = this.getFormlyFields(this.data.type);
  }

  private getFormlyFields<T>(obj: T): FormlyFieldConfig[]{
    let fields = [];
    const objectKeys = Object.keys(obj) as Array<keyof T>;

    for (let key of objectKeys)
    {
      let fieldType = this.getType(obj,key);
      fields.push(this.typeToFormlyObject(obj,key, fieldType))

      console.log('key:' + key + " of type:" + fieldType);
    }
    return fields;
  }

  private getType<T, K extends keyof T>(o: T, field: K){
    let result = 'input';

    // console.log("TYPE: " + typeof o[field]);

    if (typeof o[field] === "boolean") {
      return 'checkbox';
    }

    if(typeof  o[field] === "object"){
      return 'custom';
    }

    if((field as string).toLowerCase().endsWith("enum")){
      return 'select';
    }

    return result;
  }

  private typeToFormlyObject(obj, key, fieldType) {

    if (fieldType === "select"){
      return {
        key: key,
        type: fieldType,
        templateOptions: {
          label: (key as string).toUpperCase(),
          optionFactory: function(value) {
            return { label: value.name, value: value };
          },
          placeholder: 'Enter ' + key,
          required: true,
        },
        lifecycle: {
          onInit: function() {
            timer(1000).subscribe(() => {
              let options = Array.from(obj[key].keys()).map((value, index) => ({ id: index + 1, name: value }));
              this.updateSelectOptions(options);
            });
          }
        }
      };
    }

    else {
      return {
        key: key,
        type: fieldType,
        templateOptions: {
          label: (key as string).toUpperCase(),
          placeholder: 'Enter ' + key,
          required: true,
        }
      };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
