import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ControlActionService {
  private readonly RESOURCE_PREFIX: string = 'control-actions';

  constructor(private restService: RestService) {}

  getThreatsByActionKey(actionKey: string): Observable<any> {
    return this.restService.get(`${this.RESOURCE_PREFIX}/related-threats/${actionKey}`);
  }
}
