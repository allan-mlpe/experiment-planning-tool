import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DraftService} from "../../services/draft.service";
import {PcvtUtils} from "../../shared/pcvt-utils";
import {PcvtConstants} from "../../shared/pcvt-constants";
import {ToastFactory} from "../../shared/toast-factory";
import {SIMPLE_OPTIONS} from "../../model/simple-options";
import {Draft} from "../../model/draft";
import {ApiMessage} from "../../model/pcvt-message";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit {

  draft: Draft;
  characteristicsObj: any = {};
  options = SIMPLE_OPTIONS;
  characteristics: Array<any> = [];
  private subscription: Subscription;

  saving: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private draftService: DraftService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.buildCharacteristicsObject();
    this.subscription = this.route.data.subscribe(
      (info: { draft: Draft }) => {
        this.draft = info['draft'];

        if (this.draft.characteristics !== undefined) {
          this.characteristicsObj = JSON.parse(this.draft.characteristics);
          //this.checkCharacterizationComplete();
        }
      });
  }

  buildCharacteristicsObject() {
    const questions: Array<any> = PcvtConstants.CHARACTERIZATION_QUESTIONS;
    questions.forEach(category => {
      category.questions.forEach(question => {
        this.characteristics.push(question);
      })
    });
  }

  saveCharacteristics(event) {
    this.saving = true;
    this.draft.characteristics = JSON.stringify(event);

    this.draftService.saveDraftCharacteristics(this.draft)
      .finally(() => this.saving = false)
      .subscribe(
        data => {
          ToastFactory.successToast('Characteristics have been saved');

          if(PcvtUtils.isCharacterizationInstrumentComplete(event)) {
            if(this.draft.draftType === 'FULL') {
              this.showCompleteModal();
            } else {
              this.router.navigate(['../reports'], {relativeTo: this.route });
            }
          }
        },
        (err: ApiMessage) => {
          console.log(err);
          ToastFactory.errorToast(err.message);
        }
      )
  }

  checkCharacterizationComplete() {
    if(PcvtUtils.isCharacterizationInstrumentComplete(this.characteristicsObj)) {
      let subsc: Subscription = this.modalService.showModal("Characterization completed", `Do you want to edit it?`, 'Yes', 'No')
        .subscribe(
          data => {
            if(!data) {
              this.router.navigate(['../workspace'], {relativeTo: this.route });
            }
            subsc.unsubscribe();
          }
        );
    }
  }

  showCompleteModal() {
    let subsc: Subscription = this.modalService.showModal("Characterization complete", `Do you want to classify the suggested threats for "${this.draft.name}" now?`, 'Yes', 'No')
      .subscribe(
        data => {
          if(data) {
            this.router.navigate(['../threats'], {relativeTo: this.route })
          } else {
            this.router.navigate(['../workspace'], {relativeTo: this.route });
          }
          subsc.unsubscribe();
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
