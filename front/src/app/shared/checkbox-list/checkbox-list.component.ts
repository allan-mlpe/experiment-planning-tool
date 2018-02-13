import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.css']
})
export class CheckboxListComponent implements OnInit {

  propertyList: Array<any> = [
    { name: "Characteristic 1"},
    { name: "Characteristic 2"},
    { name: "Characteristic 3"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
