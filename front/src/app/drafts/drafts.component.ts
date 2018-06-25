import {Component, OnInit} from '@angular/core';
import {Draft} from "../model/draft";
import {ModalService} from "../services/modal.service";
import {ApiMessage} from "../model/pcvt-message";
import {ToastFactory} from "../shared/toast-factory";
import {Subscription} from "rxjs/Subscription";
import {DraftService} from "../services/draft.service";

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent implements OnInit {

  drafts: Array<Draft> = [];

  loading: boolean = true;

  constructor(private draftService: DraftService, protected modalService: ModalService) { }

  ngOnInit() {
    this.draftService.getDrafts()
      .finally(() => this.loading = false)
      .subscribe(
        (data: Array<Draft>) => {
          this.drafts = data;
        },
        (error: ApiMessage) => {
          console.log(error);
          ToastFactory.errorToast(error.message);
        }
      );
  }

  removeDraft(draft: Draft, index: number) {
    let subsc: Subscription = this.modalService.showModal("Remove Draft", `"${draft.name}" will be deleted. Are you sure?`)
      .subscribe(
        data => {
          if(data) {
            this.draftService.deleteDraft(draft.id).subscribe(
              data => {
                this.drafts.splice(index, 1);
                ToastFactory.successToast(`"${draft.name}" deleted successfully.`);
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
