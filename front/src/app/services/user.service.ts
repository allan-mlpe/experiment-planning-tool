import {Observable} from "rxjs/Observable";
import { Injectable } from '@angular/core';

import {RestService} from "./rest.service";
import {User} from "../model/user";

@Injectable()
export class UserService {

  private readonly RESOURCE_PREFIX: string = 'users';

  constructor(private restService: RestService) { }

  getUsers(): Observable<any> {
    return this.restService.get(this.RESOURCE_PREFIX);
  }

  getUser(userId: string): Observable<any> {
    return this.restService.get(`${this.RESOURCE_PREFIX}/${userId}`);
  }

  createUser(user: User): Observable<any> {
    return this.restService.post(this.RESOURCE_PREFIX, user);
  }

  updateUser(user: User): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${user.id}`, user);
  }

  deleteUser(userId: string) {
    return this.restService.delete(`${this.RESOURCE_PREFIX}/${userId}`);
  }

}
