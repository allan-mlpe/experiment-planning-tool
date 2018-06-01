import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Credentials } from './../model/credentials';
import {RestService} from "./rest.service";
import {User} from "../model/user";

@Injectable()
export class AuthService {

  constructor(private restService: RestService) { }

  doLogin(credentials: Credentials): Observable<any> {
    return this.restService.post('sso/login', credentials)
                  .map((user : User) => {
                      this.storeUserData(user);
                      return user;
                  });
  }

  doLogout(): Observable<any>|boolean {
    localStorage.clear();

    return true;
  }

  recoveryPassword(formData: FormData|any): Observable<any> {
    return this.restService.submitFormData('sso/recovery', formData);
  }

  resetPassword(formData: FormData|any): Observable<any> {
    return this.restService.submitFormData('sso/resetPassword', formData);
  }

  isUserAuthenticated(): boolean {
    return localStorage.getItem('pcvt-token') !== null;
  }

  private storeUserData(user: User) {
    localStorage.setItem('pcvt-token', user.token);
    localStorage.setItem('id', `${user.id}`);
  }
}
