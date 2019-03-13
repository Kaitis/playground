import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {

  @Input() type: any;
  @Input() data: any;

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

}
