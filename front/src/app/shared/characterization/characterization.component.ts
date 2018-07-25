import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PcvtConstants} from "../pcvt-constants";
import {SIMPLE_OPTIONS} from "../../model/simple-options";

@Component({
  selector: 'app-characterization',
  templateUrl: './characterization.component.html',
  styleUrls: ['./characterization.component.css']
})
export class CharacterizationComponent implements OnInit {

  @Input()
  characteristicsObj: any = {};

  @Input()
  saving: boolean = false;

  @Output()
  onSubmitForm: EventEmitter<any> = new EventEmitter<any>();

  options = SIMPLE_OPTIONS;
  instrumentQuestions = PcvtConstants.INSTRUMENT_QUESTIONS;
  private readonly CHARACTERIZATION_QUESTIONS = PcvtConstants.CHARACTERIZATION_QUESTIONS;

  constructor() { }

  ngOnInit() {
  }

  getCharacterizationQuestionsObject(key: string): any {
    return this.CHARACTERIZATION_QUESTIONS.find(item => item['key'] === key);
  }

  submitCharacteristicsObj() {
    this.onSubmitForm.emit(this.characteristicsObj);
  }
}
