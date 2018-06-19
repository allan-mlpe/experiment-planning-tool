import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent implements OnInit {

  @Input()
  arrayRoutes: Array<string>;

  @Input()
  materializeIcon: string;

  @Input()
  label: string;

  @Input()
  value: string;

  constructor() { }

  ngOnInit() {
  }

}
