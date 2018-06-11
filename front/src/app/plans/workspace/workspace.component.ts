import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Plan} from "../../model/plan";
import {PlanService} from "../../services/plan.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  plan: Plan;
  private subscription: Subscription;

  constructor(
    private planService: PlanService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(
      (info: {plan: Plan}) => {
        this.plan = info['plan'];
      }
    );
  }
}
