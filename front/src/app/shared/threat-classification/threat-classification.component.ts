import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PcvtUtils} from "../pcvt-utils";
import {ModalService} from "../../services/modal.service";
import {Subscription} from "rxjs/Rx";
import {CustomThreatModalComponent} from "../custom-threat-modal/custom-threat-modal.component";

declare var $: any;

@Component({
  selector: 'app-threat-classification',
  templateUrl: './threat-classification.component.html',
  styleUrls: ['./threat-classification.component.css']
})
export class ThreatClassificationComponent implements OnInit {

  options: Array<any> = [
    {name: 'Impact', hint: 'Perspective of the intensity or impact that a threat can cause the results of the experiment'},
    {name: 'Urgency', hint: 'Degree of urgency of the resolution'},
    {name: 'Trend', hint: 'Trend of the identified risk situation'}
  ];
  values = [1, 2, 3];


  @Input()
  threatList: Array<any> = [];

  @Input()
  customThreatList: Array<any> = [];

  @Input()
  threatObj: any = {};

  @Input()
  customThreatObj: any = {};

  @Output()
  submitThreatObject: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  saving: boolean = false;

  @Input()
  loading: boolean = true;

  @Input()
  showInfoPanel: boolean;

  showNotClassifiedItems: boolean = false;

  @ViewChild(CustomThreatModalComponent) newThreatModal: CustomThreatModalComponent;

  openNewThreatModal() {
    this.newThreatModal.openModal();
  }

  constructor(private modalService: ModalService) { }

  ngOnInit() {}

  submitThreatObj() {

    if(!PcvtUtils.isThreatClassificationComplete(this.threatObj) || !PcvtUtils.isCustomThreatClassificationComplete(this.customThreatObj)) {
      let subsc: Subscription = this.modalService.showModal(
        'Classification is incomplete',
        'Finishing the threat classification is mandatory to be able to define control actions to your experiment.<br><br>Do you want to save and continue later? ',
        'YES', 'NO'
      ).subscribe((save: boolean) => {
        if(save) {
          const allThreats: any = {
            default: this.threatObj,
            custom: this.customThreatObj
          }
          this.submitThreatObject.emit(allThreats);
        } else {
          this.showNotClassifiedItems = true;
        }

        subsc.unsubscribe();
      });

    } else {
      this.submitThreatObject.emit(this.threatObj);
    }
  }

  startClassification() {
    this.showInfoPanel = false;
  }

  getScaleTips() {
    return PcvtUtils.getHTMLListAsString(this.options);
  }

  onNewThreatEvent(newThreat: any) {
    this.customThreatList.push(newThreat);
    this.customThreatObj[newThreat['key']] = newThreat;
  }

  getItemClass(value) {
    return {
      'not-checked-threat': this.showNotClassifiedItems && value === undefined
    }
  }

  deleteCustomThreat(threat: any, index: number) {
    delete this.customThreatObj[threat['key']];
    this.customThreatList.splice(index, 1);
  }

  editCustomThreat(threat: any) {
    this.newThreatModal.openModal(threat);
  }
}
