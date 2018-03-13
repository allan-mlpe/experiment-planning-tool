import { Component, OnInit } from '@angular/core';
import { THREAT_OPTIONS } from './../../model/threat-options';

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.css']
})
export class ThreatsComponent implements OnInit {

  options: Array<any> = THREAT_OPTIONS;

  threats: Array<any> = [
    { id: 1, text: "Threat 1"},
    { id: 2, text: "Threat 2"},
    { id: 3, text: "Threat 3"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
