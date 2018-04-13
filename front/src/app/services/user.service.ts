import {Observable} from "rxjs/Observable";
import { Injectable } from '@angular/core';

import {RestService} from "./rest.service";
import {User} from "../model/user";

@Injectable()
export class UserService {

  constructor(private restService: RestService) { }

  updateUser(user: User): Observable<any> {
    return this.restService.put(`users/${user.id}`, user);
  }

}
