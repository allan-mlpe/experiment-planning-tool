import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Credentials } from './../model/credentials';
import {RestService} from "./rest.service";

@Injectable()
export class AuthService {

  token;
  lastRequest;

  userAuthenticated: boolean = false;

  constructor(private restService: RestService) { }

  doLogin(credentials: Credentials): Observable<any> {
    return this.restService.execPost('sso/login', credentials);
  }

  doLogout(): Observable<any>|boolean {
    this.userAuthenticated = false;

    return this.userAuthenticated;
  }

  recoveryPassword(formData: FormData|any): Observable<any> {
    return this.restService.submitFormData('sso/recovery', formData);
  }

  resetPassword(formData: FormData|any): Observable<any> {
    return this.restService.submitFormData('sso/resetPassword', formData);
  }

  isUserAuthenticated(): boolean {
    return this.userAuthenticated;
  }
}
