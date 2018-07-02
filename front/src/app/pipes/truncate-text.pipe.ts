import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, limit = 25, completeWords = false, ellipsis = '...'): string {

    let formattedString: string = '';

    try {
      if(value.length > limit) {
        if (completeWords) {
          limit = value.substr(0, 13).lastIndexOf(' ');
        }
        formattedString = `${value.substr(0, limit)}${ellipsis}`;
      } else {
        formattedString = value;
      }
    } catch (e) { }

    return formattedString;
  }

}
