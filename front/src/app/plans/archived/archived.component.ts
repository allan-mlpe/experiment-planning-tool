import {Component, OnInit} from '@angular/core';
import {PlanService} from "../../services/plan.service";
import {Plan} from "../../model/plan";
import {ToastFactory} from "../../shared/toast-factory";
import {ApiMessage} from "../../model/pcvt-message";

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent implements OnInit {

  plans: Array<Plan> = [];

  loading: boolean = true;

  constructor(private planService: PlanService) { }

  ngOnInit() {
    this.planService.getPlans({state: 'archived'})
      .finally(() => this.loading = false)
      .subscribe(
        (data: Array<Plan>) => {
          this.plans = data;
        },
        (error: ApiMessage) => {
          console.log(error);
          ToastFactory.errorToast(error.message);
        }
      );
  }

  unarchivePlan(plan: Plan, index: number) {
    const oldState = plan.state;
    plan.state = '...';

    this.planService.unarchivePlan(plan).subscribe(
      data => {
        ToastFactory.successToast(`"${plan.name}" unarchived successfully`);
        this.plans.splice(index, 1);
      },
      (err: ApiMessage) => {
        plan.state = oldState;
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    );
  }
}
