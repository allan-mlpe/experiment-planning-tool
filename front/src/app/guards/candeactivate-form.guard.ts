import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { IFormCanDeactivate } from './Iform-candeactivate';

@Injectable()
export class CanDeactivateFormGuard implements CanDeactivate<IFormCanDeactivate> {        
    canDeactivate(
        component: IFormCanDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        return component.canDeactivateForm();
    }
}