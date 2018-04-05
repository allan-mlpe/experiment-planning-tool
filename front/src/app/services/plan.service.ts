import { Injectable } from '@angular/core';
import { Plan } from '../model/plan';
import { RestService } from './rest.service';

@Injectable()
export class PlanService {
  plans: Array<Plan>
  projectsMock: Array<any> = [
    {id: 1, name: "Project 1", description: "This is my first project", lastModification: "11/11/2017", threatList: null, actionList: null},
    {id: 2, name: "Project 2", description: "This is my second project", lastModification: "1/22/2018", threatList: null, actionList: null},
    {id: 3, name: "Project 3", description: "This is a project", lastModification: "1/31/2018", threatList: null, actionList: null}
  ];

  constructor(private restService: RestService) {
    /*this.getProjects().subscribe(
      (data : Array<Project>) => {
        this.projects = data;
      }, error => {
        console.log(error);
      }
    )*/
    this.plans = this.projectsMock.filter(projectMock => projectMock);
  }

  getPlans() {
    //return this.restService.get('assets/Plans.json');
    console.log(this.plans);
    return this.plans;
  }

  getPlanById(id: number): Plan {
    return this.plans.find(pln => pln.id === id);
  }

  savePlan(plan: Plan) {
    this.plans.push(plan);
  }

  deletePlan(plan: Plan) {
    this.plans = this.plans.filter(pln => pln !== plan);
  }
}
