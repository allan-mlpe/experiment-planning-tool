import { Component, OnInit } from '@angular/core';
import { SIMPLE_OPTIONS } from '../../model/simple-options'
import {PcvtConstants} from "../../shared/pcvt-constants";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastFactory} from "../../shared/toast-factory";

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit {

  options = SIMPLE_OPTIONS;
  characteristics: Array<any> = [];
  private planId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildCharacteristicsObject();
    this.planId = this.route.snapshot.params['id'];

    const planCharacteristics = localStorage.getItem(this.planId);

    if(planCharacteristics !== null) {
      this.characteristics = JSON.parse(planCharacteristics);
    } else {
      this.buildCharacteristicsObject();
    }
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
    localStorage.setItem(this.planId, JSON.stringify(this.characteristics));

    ToastFactory.successToast('Characteristics of the plan defined')
    this.router.navigate(['../workspace'], {relativeTo: this.route });
  }
}
