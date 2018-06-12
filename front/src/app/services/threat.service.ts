import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ThreatsService {
  private readonly RESOURCE_PREFIX: string = 'threats';

  constructor(private restService: RestService) {}

  getCharacteristicsList(): Observable<any> {
    return this.restService.get(this.RESOURCE_PREFIX);
  }

  getThreatsByKeys(wrapper: any) {
    return this.restService.post(`${this.RESOURCE_PREFIX}/by-keys`, wrapper);
  }
}
