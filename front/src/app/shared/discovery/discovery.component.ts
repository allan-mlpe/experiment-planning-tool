import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MaterializeAction} from "angular2-materialize";

declare var $: any;

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {

  tapTargetActions = new EventEmitter<MaterializeAction>();

  @Input()
  title: string = '';

  @Input()
  text: string = '';

  constructor() { }

  ngOnInit() {}

  openTapTarget() {
    this.tapTargetActions.emit({action:"tapTarget",params:["open"]});
  }
  closeTapTarget() {
    this.tapTargetActions.emit({action:"tapTarget",params:["close"]});
  }

  showDiscovery() {
    this.openTapTarget();
  }

  hideDiscovery() {
    this.closeTapTarget();
  }
}
