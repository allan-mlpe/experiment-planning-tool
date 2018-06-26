import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {Subscription} from "rxjs/Rx";
import {DraftService} from "../../services/draft.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CharacteristicsService} from "../../services/characteristics.service";
import {ToastFactory} from "../../shared/toast-factory";
import {Draft} from "../../model/draft";
import {ApiMessage} from "../../model/pcvt-message";

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.css']
})
export class ThreatsComponent implements OnInit {

  draft: Draft;
  private subscription: Subscription;

  // options: Array<any> = THREAT_OPTIONS;

  currentObject: any;
  currentObjectIndex: number;
  threatList: Array<any> = [];
  threatObj: any = {};

  options: Array<any> = [
    {name: 'Impact', hint: 'Perspective of the intensity or impact that a threat can cause the results of the experiment'},
    {name: 'Urgency', hint: 'Degree of urgency of the resolution'},
    {name: 'Trend', hint: 'Trend of the identified risk situation'}
  ];
  values = [1, 2, 3];

  loading: boolean = true;
  saving: boolean = false;
  showInfoPanel: boolean;

  constructor(
    private draftService: DraftService,
    private characteristicService: CharacteristicsService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(
      (info: { draft: Draft }) => {
        this.draft = info['draft'];

        if(this.draft.draftType === 'SIMPLE') {
          ToastFactory.warningToast('It is not possible to set threats for a simple draft');
          this.router.navigate(['../workspace'], {relativeTo: this.route });
          return;
        }

        this.showInfoPanel = this.draft.threats === undefined;

        if (this.draft.characteristics !== undefined) {
          const characteristics: any = JSON.parse(this.draft.characteristics);

          const characteristicsKeys: Array<string> = Object.keys(characteristics)
            .filter(key => characteristics[key] === 'YES');

          if(characteristicsKeys.length > 0) {
            this.characteristicService.getThreatsByCharacteristicKeys({stringList: characteristicsKeys})
              .subscribe(
                data => {
                  this.threatList = data;

                  this.currentObjectIndex = 0;
                  this.currentObject = this.threatList[this.currentObjectIndex];
                  this.processClassification();
                },
                (err: ApiMessage) => {
                  console.log(err);
                  ToastFactory.errorToast(err.message);
                }
              )
          }
        } else {
          ToastFactory.infoToast("You must first define the characteristics of the draft");
          this.router.navigate(['../characteristics'], {relativeTo: this.route });
        }
      }
    );
  }

  saveDraftThreats() {
    this.saving = true;
    this.draft.threats = JSON.stringify(this.threatObj);

    this.draftService.saveDraftThreats(this.draft)
      .finally(() => this.saving = false)
      .subscribe(
        data => {
          ToastFactory.successToast("Threats have been saved");

          this.router.navigate(['../workspace'], {relativeTo: this.route })
        },
        (err: ApiMessage) => {
          console.log(err);
          ToastFactory.errorToast(err.message);
        }
      );
  }

  processClassification() {
    this.threatList.forEach(threat => {
      this.threatObj[threat.key] = {};
    });

    if(this.draft.threats !== undefined) {
      this.threatObj = Object.assign(this.threatObj, JSON.parse(this.draft.threats));

      //this.checkClassificationComplete();
    }

    this.loading = false;
  }

  startClassification() {
    this.showInfoPanel = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
