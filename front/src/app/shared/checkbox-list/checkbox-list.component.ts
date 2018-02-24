import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.css']
})
export class CheckboxListComponent implements OnInit {

  @Output() 
  selected: EventEmitter<any> = new EventEmitter<any>();
  //@Input()
  selectedList: Array<any> = [
    { id: 1, name: "Characteristic 1"}
  ];

  propertyList: Array<any> = [
    { id: 1, name: "Characteristic 1"},
    { id: 2, name: "Characteristic 2"},
    { id: 3, name: "Characteristic 3"}
  ];

  constructor() { }

  ngOnInit() {
  }

  emitSelecteds() {
    this.selected.emit(this.selectedList);
  }

  updateSelectedList(property, checkBox: HTMLInputElement) {
    if(checkBox.
      checked && !this.isSelected(property)) {
      // add property to selected list
      this.selectedList.push(property);
    } else if(!checkBox.checked && this.isSelected(property)) {
      // remove property from selected list
      this.selectedList = this.selectedList.filter(p => p['id'] !== property['id']);
    }
  }

  isSelected(property): boolean {
    return this.selectedList.some(p => p['id'] === property['id']);
  }
}
