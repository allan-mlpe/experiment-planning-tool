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
                      this.storeToken(user.token);
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

  private storeToken(token: string) {
    localStorage.setItem('pcvt-token', token);
  }
}
