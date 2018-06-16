import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFormCanDeactivate} from "../../guards/Iform-candeactivate";
import {Subscription} from "rxjs/Rx";
import {ModalService} from "../../services/modal.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FormValidateUtils} from "../../shared/form-validate-utils";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {Plan} from "../../model/plan";
import {ApiMessage} from "../../model/pcvt-message";
import {ToastFactory} from "../../shared/toast-factory";
import {ReviewsService} from "../../services/reviews.service";

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  availableReviewers: Array<User> = [];
  plan: Plan;

  todayDate: string;

  form: FormGroup;
  private formValidateUtils: FormValidateUtils;
  private selectedReviewers: Array<User> = [];

  /**
   * Subscription to listen changes in form
   */
  private subsc: Subscription;

  /**
   * Resolve subscription object
   */
  private subsc2: Subscription;


  /**
   * Flag changes in form
   */
  private hasUnsavedChanges: boolean = false;

  loading: boolean = true;
  loadingButton: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private reviewsService: ReviewsService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.subsc2 = this.route.data.subscribe(
      (info: {plan: Plan}) => {
        this.plan = info['plan'];
      }
    );

    this.form = this.formBuilder.group({
      reviewers: [''],
      expireDate: ['', [Validators.required]]
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
    this.subsc = this.form.valueChanges.subscribe(
      (data) => {
        this.hasUnsavedChanges = true;

        // if a change already occurred, it's not necessary to keep the subscribe
        this.subsc.unsubscribe();
      }
    )

    this.userService.getAvailable()
      .finally(() => this.loading = false)
      .subscribe(
      (data: Array<User>) => {
        this.availableReviewers = data;

        if(this.availableReviewers.length === 0) {
          ToastFactory.warningToast('No reviewer available. It\'s not possible to create a new review');
        }
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    );

    const date = new Date();
    this.todayDate = `${date.getFullYear()}-${date.getMonth() < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)}-${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}`;
  }

  selectItem(user, target) {
    const index: number = this.selectedReviewers.indexOf(user);
    if(index !== -1) {
      this.selectedReviewers.splice(index, 1);
    } else {
      this.selectedReviewers.push(user);
    }

    if(this.selectedReviewers.length === 0) {
      this.form.get('reviewers').setErrors({required: true});
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.loadingButton = true;
      console.log(this.selectedReviewers);
      console.log(this.form.get('expireDate').value);
      const dateField = new Date(Date.parse(this.form.get('expireDate').value)) ;

      const reviewWrapperObj: any = {
        plan: this.plan,
        reviewers: this.selectedReviewers,
        date: dateField
      }

      this.reviewsService.createReview(reviewWrapperObj)
        .finally(() => this.loadingButton = false)
        .subscribe(
        (data: ApiMessage) => {
          ToastFactory.successToast(data.message);
          this.hasUnsavedChanges = false;
          this.navigateToReadyToReviewList();
        },
        (err: ApiMessage) => {
          console.log(err);
          ToastFactory.errorToast(err.message);
        }
      )

    } else {
      this.formValidateUtils.checkAllFields(this.form);
    }
  }

  showError(field: string): boolean {
    return this.formValidateUtils.checkInvalidAndTouchedField(field);
  }

  buildErrorMessage(field: string): string {
    return this.formValidateUtils.buildErrorMessage(field);
  }

  addClassError(field: string) {
    let result = this.showError(field);
    return {
      invalid: result
    }
  }

  canDeactivateForm() {
    return !this.hasUnsavedChanges || this.modalService.showUnsaveChangesModal();
  }

  navigateToReadyToReviewList() {
    this.router.navigate(['/', 'plans'])
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
    this.subsc2.unsubscribe();
  }
}
