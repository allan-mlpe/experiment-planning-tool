import {Component, Input, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-info-tooltip',
  templateUrl: './info-tooltip.component.html',
  styleUrls: ['./info-tooltip.component.css']
})
export class InfoTooltipComponent implements OnInit {

  @Input()
  hint: string;

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });
  }
}
