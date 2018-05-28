import {Component, OnInit} from '@angular/core';
import {PlanService} from '../services/plan.service';
import {Plan} from '../model/plan';
import {Subscription} from 'rxjs/Subscription';
import {ModalService} from '../services/modal.service';
import {ToastFactory} from '../shared/toast-factory';
import {ApiMessage} from "../model/pcvt-message";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  plans: Array<Plan>;

  constructor(private planService: PlanService, protected modalService: ModalService) { }

  ngOnInit() {
    this.planService.getPlans().subscribe(
      (data: Array<Plan>) => {
        this.plans = data;
      },
      (error: ApiMessage) => {
        console.log(error);
        ToastFactory.errorToast(error.message);
      }
    );
  }

  editPlan() {
    console.log("Edit project");
  }

  removePlan(plan: Plan, index: number) {
    let subsc: Subscription = this.modalService.showModal("Remove Plan", `"${plan.name}" will be deleted. Are you sure?`)
      .subscribe(
        data => {
          if(data) {
            this.planService.deletePlan(plan.id).subscribe(
              data => {
                this.plans.splice(index, 1);
                ToastFactory.successToast(`"${plan.name}" deleted successfuly.`);
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

}
