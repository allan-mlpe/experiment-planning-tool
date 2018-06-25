import {Component, OnInit} from '@angular/core';
import {PlanService} from '../services/plan.service';
import {Plan} from '../model/plan';
import {Subscription} from 'rxjs/Subscription';
import {ModalService} from '../services/modal.service';
import {ToastFactory} from '../shared/toast-factory';
import {ApiMessage} from "../model/pcvt-message";
import {PlanState} from "../model/plan-state.enum";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  plans: Array<Plan> = [];

  loading: boolean = true;

  constructor(private planService: PlanService, protected modalService: ModalService) { }

  ngOnInit() {
    this.planService.getPlans()
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

  getEnumValue(enumKey: PlanState): string {
    return PlanState[enumKey];
  }

  removePlan(plan: Plan, index: number) {
    let subsc: Subscription = this.modalService.showModal("Remove Plan", `"${plan.name}" will be deleted. Are you sure?`)
      .subscribe(
        data => {
          if(data) {
            this.planService.deletePlan(plan.id).subscribe(
              data => {
                this.plans.splice(index, 1);
                ToastFactory.successToast(`"${plan.name}" deleted successfully.`);
              },
              (err: ApiMessage) => {
                ToastFactory.errorToast(err.message);
              }
            );
          }
          subsc.unsubscribe();
        }
      );
  }

  archivePlan(plan: Plan, index: number) {
    const oldState = plan.state;
    plan.state = '...';

    this.planService.archivePlan(plan).subscribe(
        data => {
          ToastFactory.successToast(`"${plan.name}" successfully archived`);
          this.plans.splice(index, 1);
        },
        (err: ApiMessage) => {
          plan.state = oldState;
          console.log(err);
          ToastFactory.errorToast(err.message);
        }
      );
  }

  createNewVersion(plan: Plan) {
    const oldState = plan.state;
    plan.state = '...';

    this.planService.createNewVersion(plan)
      .finally(() => plan.state = oldState)
      .subscribe(
      (data: Plan) => {
        ToastFactory.successToast(`New version for "${plan.name}" successfully created`);
        plan.hasChild = true;
        this.plans.push(data);
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    );
  }

}
