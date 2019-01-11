import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dinamic-table-field',
  templateUrl: './dinamic-table-field.component.html',
  styleUrls: ['./dinamic-table-field.component.css']
})
export class DinamicTableFieldComponent implements OnInit {

  @Input()
  objectArray: Array<any>;

  constructor() { }

  ngOnInit() {
    if(!this.objectArray || this.objectArray.length ==  0) {
      this.resetTable();
    }
  }

  addRow() {
    let obj = this.objectArray[0];
    let columns = Object.keys(obj);
    let newRow = {};

    columns.forEach(key => {
      newRow[key] = '';
    });

    this.objectArray.push(newRow);
  }

  addColumn() {
    let obj = this.objectArray[0];
    let columns = Object.keys(obj).length;

    this.objectArray.map(item => {
      item[`p${columns+1}`] = '';
      return item;
    });

  }

  getObjectKey(obj) {
    return Object.keys(obj);
  }

  onKeyUp(obj, key, value) {
    obj[key] = value;
  }

  resetTable() {
    if(this.objectArray === undefined) {
      this.objectArray = [];
    }
    // remove all items if objectArray is populated
    this.objectArray.length = 0;

    // set default objectArray
    this.objectArray.push({p1: ''});
  }
}
