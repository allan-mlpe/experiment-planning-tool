import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

declare var $: any;

@Component({
  selector: 'app-info-alert',
  templateUrl: './info-alert.component.html',
  styleUrls: ['./info-alert.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0,
        display: 'none'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class InfoAlertComponent implements OnInit {

  @Input()
  message: string = '';

  @Input()
  type: string = 'info';

  constructor() { }

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    $('#alert_close').click(function(){
      $( "#alert_box" ).fadeOut( "slow", function() {
      });
    });
  }

  fadeOutInfo() {
    $( "#alert_box" ).fadeOut( "slow", function() {
    });
  }

  getInfoType() {
    return {
      'light-blue': this.type === 'info',
      'red': this.type === 'error',
      'orange': this.type === 'warning'
    }
  }
}
