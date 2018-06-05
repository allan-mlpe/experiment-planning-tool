import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {ApiMessage} from "../../model/pcvt-message";
import {Plan} from "../../model/plan";
import {ToastFactory} from "../../shared/toast-factory";
import {PlanService} from "../../services/plan.service";

@Component({
  selector: 'app-ready-to-review',
  templateUrl: './ready-to-review.component.html',
  styleUrls: ['./ready-to-review.component.css', '../plans.component.css']
})
export class ReadyToReviewComponent implements OnInit {

  plans: Array<Plan> = [];

  loading: boolean = true;

  constructor(private planService: PlanService, protected modalService: ModalService) { }

  ngOnInit() {
    this.planService.getPlans({state: 'ready'})
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
}
