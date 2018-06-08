import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class CharacteristicsService {
  private readonly RESOURCE_PREFIX: string = 'characteristics';

  constructor(private restService: RestService) {}

  getCharacteristicsList(): Observable<any> {
    return this.restService.get(this.RESOURCE_PREFIX);
  }

  getThreatsByCharacteristicKeys(wrapper: any) {
    return this.restService.post(`${this.RESOURCE_PREFIX}/related-threats`, wrapper);
  }
}
