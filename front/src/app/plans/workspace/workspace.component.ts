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

  characterizationComplete: boolean;
  threatsClassificationComplete: boolean;

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

  private openFeature(feature: string) {
    let modalTitle: string = '';
    let modalText: string = 'Do you want edit them?';
    switch (feature) {
      case 'characteristics':
        modalTitle = 'Characteristics have already been defined';
        break;
      case 'threats':
        modalTitle = 'Threats have already been defined';
        break;
      case 'actions':
        modalTitle = 'Control actions have already been defined';
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

  openCharacterization() {
    const path: string = 'characteristics';
    if(this.isCharacterizationCompleted()) {
      this.openFeature(path);
    } else {
      this.router.navigate([`../${path}`], {relativeTo: this.route })
    }
  }

  openThreatsClassification() {
    const path: string = 'threats';
    if(this.isThreatsClassificationCompleted()) {
      this.openFeature(path);
    } else {
      this.router.navigate([`../${path}`], {relativeTo: this.route })
    }
  }

  showThreatsOption(): boolean {
    return this.isCharacterizationCompleted();
  }


  showActionsOption() {
    return this.isThreatsClassificationCompleted();
  }

  showReportOption() {
    return this.isCharacterizationCompleted();
  }

  private isThreatsClassificationCompleted(): boolean {
    if(this.threatsClassificationComplete === undefined) {

      const threatsObj = this.plan.planThreats !== undefined ?
        JSON.parse(this.plan.planThreats) : undefined;

      this.threatsClassificationComplete = PcvtUtils.isThreatClassificationComplete(threatsObj);
    }

    return this.threatsClassificationComplete;
  }

  private isCharacterizationCompleted(): boolean {
    if(this.characterizationComplete === undefined) {
      const characteristicsObj = this.plan.planCharacteristics !== undefined ?
        JSON.parse(this.plan.planCharacteristics) : undefined;

      this.characterizationComplete = PcvtUtils.isCharacterizationInstrumentComplete(characteristicsObj);
    }

    return this.characterizationComplete;
  }
}
