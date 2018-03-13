import { Component, OnInit } from '@angular/core';
import { SIMPLE_OPTIONS } from '../../model/simple-options'

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit {

  options = SIMPLE_OPTIONS;
  
  characteristics: Array<any> = [
    { id: 1, text: "Characteristic 1"},
    { id: 2, text: "Characteristic 2"},
    { id: 3, text: "Characteristic 3"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
