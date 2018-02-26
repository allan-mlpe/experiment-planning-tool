import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs/Rx";
import { Project } from "../model/project";
import { ProjectService } from "../services/project.service";

@Injectable()
export class ProjectResolver implements Resolve<Project> {
    constructor(
        private projectService: ProjectService,
        private route: ActivatedRoute
    ) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {
            let id: number = parseInt(route.params['id']);

            return this.projectService.getProjectById(id);
    }
}