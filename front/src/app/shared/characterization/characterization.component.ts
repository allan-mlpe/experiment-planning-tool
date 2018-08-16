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

  characterizationInstrument = [];
  private readonly CHARACTERIZATION_QUESTIONS = PcvtConstants.CHARACTERIZATION_QUESTIONS;
  private readonly INSTRUMENT_QUESTIONS  = PcvtConstants.INSTRUMENT_QUESTIONS;

  constructor() { }

  ngOnInit() {
    this.characterizationInstrument = this.processInstrumentQuestionView();
  }

  private getCharacterizationQuestionsObject(key: string): any {
    return this.CHARACTERIZATION_QUESTIONS.find(item => item['key'] === key);
  }

  submitCharacteristicsObj() {
    this.onSubmitForm.emit(this.characteristicsObj);
  }

  private processInstrumentQuestionView() {
    let questions = [];
    try {
      questions = this.INSTRUMENT_QUESTIONS.filter(question => {
        const characterizationQuestions: Array<any> = this.getCharacterizationQuestionsObject(question.key);
        if(characterizationQuestions !== undefined && characterizationQuestions['questions'].length > 0) {
          question['questions'] = characterizationQuestions['questions'];
          return question;
        }
      });
    } catch (e) {}

    return questions;
  }
}
