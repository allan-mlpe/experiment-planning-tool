import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Plan} from "../../model/plan";
import {PlanService} from "../../services/plan.service";
import {Subscription} from 'rxjs';
import {ModalService} from "../../services/modal.service";
import {PcvtUtils} from "../../shared/pcvt-utils";

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
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(
      (info: {plan: Plan}) => {
        this.plan = info['plan'];
      }
    );
  }

  openFeature(feature: string) {
    let modalTitle: string = '';
    let modalText: string = 'Do you want to update or define new ones?';
    switch (feature) {
      case 'characteristics':
        modalTitle = 'Characteristics already defined';
        break;
      case 'threats':
        modalTitle = 'Threats already defined';
        break;
      case 'actions':
        modalTitle = 'Control actions already defined';
        break;
    }

    this.modalService.showModal(modalTitle, modalText, 'YES', 'NO').subscribe(
      data => {
        if(data) {
          this.router.navigate([`../${feature}`], {relativeTo: this.route })
        }
      }
    );
  }

  showThreatsOption(): boolean {
    const characteristicsObj = this.plan.planCharacteristics !== undefined ?
            JSON.parse(this.plan.planCharacteristics) : {};
    return PcvtUtils.isCharacterizationInstrumentComplete(characteristicsObj);
  }


  showActionsOption() {
    const threatsObj = this.plan.planThreats !== undefined ?
            JSON.parse(this.plan.planThreats) : {};

    return PcvtUtils.isThreatClassificationComplete(threatsObj);
  }

  showReportOption() {
    const characteristicsObj = this.plan.planCharacteristics !== undefined ?
      JSON.parse(this.plan.planCharacteristics) : {};
    return PcvtUtils.isCharacterizationInstrumentComplete(characteristicsObj);
  }
}
