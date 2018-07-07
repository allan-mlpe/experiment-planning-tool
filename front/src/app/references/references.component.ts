import {Component, OnInit} from '@angular/core';
import {PcvtConstants} from "../shared/pcvt-constants";

declare var $: any;

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit {

  references = PcvtConstants.REFERENCES;

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  }

}
