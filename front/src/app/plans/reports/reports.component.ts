import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Plan} from "../../model/plan";
import {ActivatedRoute} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {
  plan: Plan;
  private subsc: Subscription;

  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.subsc = this.route.data.subscribe(
      (info: { plan: Plan }) => {
        this.plan = info['plan'];
    });
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
