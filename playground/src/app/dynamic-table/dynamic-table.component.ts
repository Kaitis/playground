import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from "@angular/material";

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {

  @Input() type: any;
  @Input() data: any;

  @ViewChild('matMenuTrigger') matMenuTrigger: MatMenuTrigger;

  columns: string[] = [];
  columnsToDisplay: string[] = [];

  constructor() {
  }

  ngOnInit() {
    console.log("Type:", this.type)
    Object.keys(this.type).forEach((property) => { this.columns.push(property) });
    this.columnsToDisplay = this.columns;
    console.log("Columns:", this.columns);
  }

  openMenu(row: any) {
    console.log(row);
    this.matMenuTrigger.openMenu();
  }
}
