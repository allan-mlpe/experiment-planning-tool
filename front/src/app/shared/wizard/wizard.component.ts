import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  //@Input()
  propertyList: Array<any> = [
    { id: 1, text: "Characteristic 1"},
    { id: 2, text: "Characteristic 2"},
    { id: 3, text: "Characteristic 3"}
  ];;

  @Output()
  submitList: EventEmitter<Array<any>> = new EventEmitter<Array<any>>(); 

  constructor() { }

  ngOnInit() {
    $('ul.tabs').tabs();
  }

}
