import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Credentials } from './../model/credentials';

@Injectable()
export class AuthService {

  token;
  lastRequest;

  private userAuthenticated: boolean = false;

  constructor() { }

  doLogin(credentials: Credentials): Observable<any>|boolean {

    if(credentials.login === 'user' && credentials.password === '123456') {
      this.userAuthenticated = true;
    } else {
      this.userAuthenticated = false;
    }

    return this.userAuthenticated;
  }

  doLogout(): Observable<any>|boolean {
    this.userAuthenticated = false;

    return this.userAuthenticated;
  }

  isUserAuthenticated(): boolean {
    return this.userAuthenticated;
  }
}
