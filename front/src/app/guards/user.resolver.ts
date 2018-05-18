import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs/Rx";
import {User} from "../model/user";
import {UserService} from "../services/user.service";

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    let id: number = parseInt(route.params['id']);

    return this.userService.getUser(id);
  }
}
