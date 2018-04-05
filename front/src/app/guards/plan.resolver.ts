import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs/Rx";
import { Plan } from "../model/plan";
import { PlanService } from "../services/plan.service";

@Injectable()
export class PlanResolver implements Resolve<Plan> {
    constructor(
        private planService: PlanService,
        private route: ActivatedRoute
    ) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {
            let id: number = parseInt(route.params['id']);

            return this.planService.getPlanById(id);
    }
}
