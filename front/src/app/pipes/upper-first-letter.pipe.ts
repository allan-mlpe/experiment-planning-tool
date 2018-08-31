import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'upperFirstLetter'
})
export class UpperFirstLetterPipe implements PipeTransform {

  transform(text: string, args?: any) {
    let formattedText = text;
    if(text !== undefined) {
      formattedText = text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
    }

    return formattedText;
  }

}
