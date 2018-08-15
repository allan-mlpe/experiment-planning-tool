import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Draft} from "../../model/draft";
import {Subscription} from "rxjs/Subscription";
import {Plan} from "../../model/plan";

declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  draft: Draft;
  plan: Plan;

  private subsc: Subscription;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subsc = this.route.data.subscribe(
      (info: { draft: Draft }) => {
        this.draft = info['draft'];

        this.plan = this.convertDraftToPlan(this.draft);
      });
  }

  convertDraftToPlan(draft): Plan {
    const plan = new Plan();
    plan.id = draft.id;
    plan.name = draft.name;
    plan.description = draft.description;
    plan.author = draft.author;
    plan.characteristics = draft.characteristics;
    plan.threats = draft.threats;
    plan.actions = draft.actions;
    plan.actionRelatedThreats = draft.actionRelatedThreats;

    return plan;
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }

}
