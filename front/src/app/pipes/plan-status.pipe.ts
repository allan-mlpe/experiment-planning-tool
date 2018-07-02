import { Pipe, PipeTransform } from '@angular/core';
import {PlanState} from "../model/plan-state.enum";

@Pipe({
  name: 'planStatus'
})
export class PlanStatusPipe implements PipeTransform {

  transform(value: string): string {
    return PlanState[value];
  }

}
