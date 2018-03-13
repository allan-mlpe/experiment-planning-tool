import { Component, OnInit } from '@angular/core';
import { ACTION_OPTIONS } from '../../model/action-options';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  options: Array<any> = ACTION_OPTIONS;

  actions: Array<any> = [
    { id: 1, text: "Characteristic 1"},
    { id: 2, text: "Characteristic 2"},
    { id: 3, text: "Characteristic 3"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
