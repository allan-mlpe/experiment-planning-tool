import {Pipe, PipeTransform} from '@angular/core';
import {ACTION_OPTIONS} from "../model/action-options";

@Pipe({
  name: 'actionClassification'
})
export class ControlActionClassificationPipe implements PipeTransform {

  private readonly options = ACTION_OPTIONS;

  transform(value: string): string {
    let formattedValue: string;
    const response: any = this.options.find(item => item.value === value);

    if(response !== undefined) {
      formattedValue = response.text;
    } else {
      formattedValue = 'Not classified';
    }

    return formattedValue
  }

}
