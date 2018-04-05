import {Component, OnInit} from '@angular/core';
import {PlanService} from '../services/plan.service';
import {Plan} from '../model/plan';
import {Subscription} from 'rxjs/Subscription';
import {ModalService} from '../services/modal.service';
import {ToastFactory} from '../shared/toast-factory';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  plans: Array<Plan>;

  constructor(private planService: PlanService, protected modalService: ModalService) { }

  ngOnInit() {
    /*this.projectService.getProjects().subscribe(
      (data: Array<Project>) => {
        this.projects = data;
      },
      error => {
        console.log(error);
      }
    );*/
    this.plans = this.planService.getPlans();
  }

  editPlan() {
    console.log("Edit project");
  }

  removePlan(plan: Plan) {
    let subsc: Subscription = this.modalService.showModal("Remove Plan", `"${plan.name}" will be deleted. Are you sure?`)
      .subscribe(
        data => {
          if(data) {
            this.planService.deletePlan(plan);
            this.plans = this.planService.getPlans();
            ToastFactory.successToast(`"${plan.name}" deleted successfuly.`)
          }
          subsc.unsubscribe();
        }
      );
  }

}
