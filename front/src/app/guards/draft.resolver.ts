import {Injectable} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {Observable} from "rxjs/Rx";
import {Draft} from "../model/draft";
import {DraftService} from "../services/draft.service";

@Injectable()
export class DraftResolver implements Resolve<Draft> {
  constructor(
    private draftService: DraftService,
    private route: ActivatedRoute
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    let id: number = parseInt(route.params['id']);

    return this.draftService.getDraftById(id);
  }
}
