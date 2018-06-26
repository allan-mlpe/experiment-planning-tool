import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {Subscription} from "rxjs/Rx";
import {DraftService} from "../../services/draft.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PcvtUtils} from "../../shared/pcvt-utils";
import {Draft} from "../../model/draft";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  draft: Draft;
  private subscription: Subscription;

  characterizationComplete: boolean;
  threatsClassificationComplete: boolean;

  constructor(
    private draftService: DraftService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(
      (info: {draft: Draft}) => {
        this.draft = info['draft'];
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

  openActionsClassification() {
    const path: string = 'actions';
    if(this.draft.actions !== undefined) {
      this.openFeature(path);
    } else {
      this.router.navigate([`../${path}`], {relativeTo: this.route })
    }
  }

  showThreatsOption(): boolean {
    return this.draft.draftType === 'FULL' && this.isCharacterizationCompleted();
  }


  showActionsOption() {
    return this.draft.draftType === 'FULL' && this.isThreatsClassificationCompleted();
  }

  showReportOption() {
    return this.isCharacterizationCompleted();
  }

  private isThreatsClassificationCompleted(): boolean {
    if(this.threatsClassificationComplete === undefined) {

      const threatsObj = this.draft.threats !== undefined ?
        JSON.parse(this.draft.threats) : undefined;

      this.threatsClassificationComplete = PcvtUtils.isThreatClassificationComplete(threatsObj);
    }

    return this.threatsClassificationComplete;
  }

  private isCharacterizationCompleted(): boolean {
    if(this.characterizationComplete === undefined) {
      const characteristicsObj = this.draft.characteristics !== undefined ?
        JSON.parse(this.draft.characteristics) : undefined;

      this.characterizationComplete = PcvtUtils.isCharacterizationInstrumentComplete(characteristicsObj);
    }

    return this.characterizationComplete;
  }
}
