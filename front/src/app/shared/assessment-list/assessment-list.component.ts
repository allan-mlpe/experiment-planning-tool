import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.css']
})
export class AssessmentListComponent implements OnInit {

  propertyList: Array<any> = [
    { name: "threat 1"},
    { name: "threat 2"},
    { name: "threat 3"}
  ];

  @Input()
  minimum: number;

  @Input()
  maximum: number;

  constructor() { }

  ngOnInit() {
  }
}
