import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {Magnitude} from "../../model/magnitude.enum";
import {Subscription} from "rxjs/Rx";
import {DraftService} from "../../services/draft.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CharacteristicsService} from "../../services/characteristics.service";
import {ACTION_OPTIONS} from "../../model/action-options";
import {ToastFactory} from "../../shared/toast-factory";
import {ControlActionService} from "../../services/control-action.service";
import {Draft} from "../../model/draft";
import {ApiMessage} from "../../model/pcvt-message";
import {PcvtUtils} from "../../shared/pcvt-utils";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  draft: Draft;
  currentObject: any;
  currentObjectIndex: number;
  threatList: Array<any> = [];
  filteredList: Array<any> = [];
  threatObj: any = {};
  actionObj: any = {};
  actionRelatedThreatsObj: any = {};

  private filterKeys: Array<string> = [Magnitude.VERY_HIGH, Magnitude.HIGH, Magnitude.MODERATE, Magnitude.LOW, Magnitude.VERY_LOW];
  filterObjList: Array<any> = [
    { name: 'veryHigh', value: Magnitude.VERY_HIGH },
    { name: 'high', value: Magnitude.HIGH },
    { name: 'moderate', value: Magnitude.MODERATE },
    { name: 'low', value: Magnitude.LOW },
    { name: 'veryLow', value: Magnitude.VERY_LOW},
  ];

  private subscription: Subscription;

  loading: boolean = true;
  saving: boolean = false;
  showInfoPanel: boolean;
  options: Array<any> = ACTION_OPTIONS;

  constructor(
    private draftService: DraftService,
    private characteristicService: CharacteristicsService,
    private actionsService: ControlActionService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(
      (info: { draft: Draft }) => {
        this.draft = info['draft'];

        if(this.draft.draftType === 'SIMPLE') {
          ToastFactory.warningToast('It is not possible to set control actions for a simple draft');
          this.router.navigate(['../workspace'], {relativeTo: this.route });
          return;
        }

        this.showInfoPanel = this.draft.actions === undefined;

        if (this.draft.threats !== undefined) {
          const characteristics: any = JSON.parse(this.draft.characteristics);

          const characteristicsKeys: Array<string> = PcvtUtils.getExperimentCharacteristicsKeys(characteristics);

          if(characteristicsKeys.length > 0) {
            this.characteristicService.getThreatsByCharacteristicKeys({stringList: characteristicsKeys})
              .finally(() => this.loading = false)
              .subscribe(
                data => {
                  this.threatList = data;
                  this.filteredList = data;

                  this.processClassification();
                  this.processThreatMagnitude();

                  this.initCurrentObject();
                },
                (err: ApiMessage) => {
                  console.log(err);
                  ToastFactory.errorToast(err.message);
                }
              )
          } else {
            this.loading = false;
          }
        } else {
          ToastFactory.infoToast("You must first classify the threats of the draft");
          this.router.navigate(['../threats'], {relativeTo: this.route });
        }
      }
    );
  }

  // select functions
  selectAction(action) {
    const threatKey: string = this.currentObject.key;
    const key: string = action.key;

    if(this.actionObj[threatKey][key] !== undefined) {
      delete this.actionObj[threatKey][key];

      this.removeActionRelatedThreats(key);

    } else {
      this.actionObj[threatKey][key] = '';

      this.actionsService.getThreatsByActionKey(action.key).subscribe(
        data => {
          const relatedThreats: Array<any> = data;
          const auxKeyArray: Array<string> = Object.keys(this.threatObj);
          let threatLabels: string = '';

          let newThreatsObj: any = {};
          newThreatsObj[action.key] = {};

          const newThreatsKeys: Array<string> = relatedThreats.filter(threat => {
              if(auxKeyArray.indexOf(threat.key) === -1) {
                threatLabels += `- ${threat.label}. <br />`;
                newThreatsObj[action.key][threat.key] = threat.label;

                return threat.key;
              }
            }
          );

          if(newThreatsKeys.length > 0) {
            const newThreatsKeysLength: number = newThreatsKeys.length;

            const headerStatement: string = `This action generate the following ${ newThreatsKeysLength === 1 ? 'threat' : 'threats' }: <br />`;
            const footerStatement: string = `<br/ > Do you want add ${ newThreatsKeysLength === 1 ? 'it' : 'them' } to your experimental draft?`;
            const htmlContent = headerStatement + threatLabels + footerStatement;

            let subsc: Subscription = this.modalService.showModalHTMLContent('Warning', htmlContent, 'YES', 'NO').subscribe(
              data => {
                if(data) {
                  // save newThreats
                  this.saveGeneratedThreats(newThreatsObj);
                } else {
                  delete this.actionObj[threatKey][key];
                }
                subsc.unsubscribe();
              }
            );
          }
        },
        (err: ApiMessage) => {
          console.log(err);
          ToastFactory.errorToast(err.message);
        }
      );
    }
  }

  classifyAction(action, value) {
    const threatKey: string = this.currentObject.key;
    const key: string = action.key;

    this.actionObj[threatKey][key] = value;
  }


  // process screen objects functions
  processClassification() {
    this.threatObj = JSON.parse(this.draft.threats);

    this.threatList.forEach(threat => {
      this.actionObj[threat.key] = {};
    });

    if(this.draft.actions !== undefined)
      this.actionObj = Object.assign(this.actionObj, JSON.parse(this.draft.actions));


    if(this.draft.actionRelatedThreats !== undefined)
      this.actionRelatedThreatsObj = JSON.parse(this.draft.actionRelatedThreats);
  }

  private processThreatMagnitude() {
    this.threatList.forEach(item => {
      const classificationObj = this.threatObj[item.key];
      const impact: number = classificationObj['impact'];
      const urgency: number = classificationObj['urgency'];
      const trend: number = classificationObj['trend'];

      const calculatedMagnitude: Magnitude = this.calculateThreatMagnitude(impact, urgency, trend);

      item['magnitude'] = calculatedMagnitude;
    });
  }

  private calculateThreatMagnitude(impact: number, urgency: number, trend: number): Magnitude {
    const value: number = impact * 1000 + urgency * 100 + trend * 10;

    if(value >= 3210) {
      return Magnitude.VERY_HIGH;
    } else if(value >= 2310) {
      return Magnitude.HIGH;
    } else if(value >= 2110) {
      return Magnitude.MODERATE;
    } else if(value >= 1210) {
      return Magnitude.LOW;
    } else {
      return Magnitude.VERY_LOW;
    }
  }

  initCurrentObject() {
    this.currentObjectIndex = 0;
    this.currentObject = this.filteredList[this.currentObjectIndex];
  }


  // wizzard funcions
  nextItem() {
    this.currentObjectIndex+=1;
    this.currentObject = this.filteredList[this.currentObjectIndex];
  }

  previousItem() {
    this.currentObjectIndex-=1;
    this.currentObject = this.filteredList[this.currentObjectIndex];
  }

  getProgress() {
    const numerator: number = this.currentObjectIndex+1;
    const denominator: number = this.filteredList.length;
    const progress: number = numerator/denominator * 100;

    return {
      'width': `${progress}%`
    }
  }

  finish() {
    this.saving = true;
    this.draft.actions = JSON.stringify(this.actionObj);
    this.draft.actionRelatedThreats = JSON.stringify(this.actionRelatedThreatsObj);

    this.draftService.saveDraftActions(this.draft)
      .finally(() => this.saving = false)
      .subscribe(
        data => {
          ToastFactory.successToast("Control actions have been saved");

          this.router.navigate(['../workspace'], {relativeTo: this.route })
        },
        (err: ApiMessage) => {
          console.log(err);
          ToastFactory.errorToast(err.message);
        }
      );
  }

  // filter functions
  selectFilter(filter) {
    const index = this.filterKeys.indexOf(filter);

    if(index === -1) {
      this.filterKeys.push(filter);
    } else {
      this.filterKeys.splice(index, 1);
    }

    this.filterThreatList();
    this.initCurrentObject();
  }

  private saveGeneratedThreats(newThreats: any) {
    // merge old and new threats objects
    Object.assign(this.actionRelatedThreatsObj, newThreats);

    //this.updateActionRelatedThreats(actionRelatedThreats);
  }

  private updateActionRelatedThreats(actionRelatedThreats: any) {
    this.draft.actionRelatedThreats = JSON.stringify(actionRelatedThreats);

    this.draftService.saveDraftGeneratedActions(this.draft).subscribe(
      data => {
        ToastFactory.successToast('Actions related threats successfully updated');
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    );
  }

  startClassification() {
    this.showInfoPanel = false;
  }

  private removeActionRelatedThreats(actionKey: string) {

    if(this.draft.actionRelatedThreats !== undefined) {
      if(actionKey in this.actionRelatedThreatsObj) {
        delete this.actionRelatedThreatsObj[actionKey];

        //this.updateActionRelatedThreats(actionRelatedThreats);
      }
    }
  }

  private filterThreatList() {
    this.filteredList = this.threatList.filter(threat => this.filterKeys.indexOf(threat.magnitude) != -1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
