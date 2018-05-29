import { Injectable } from '@angular/core';
import { Plan } from '../model/plan';
import { RestService } from './rest.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class PlanService {
  private readonly RESOURCE_PREFIX: string = 'plans';

  constructor(private restService: RestService) {}

  getPlans(): Observable<any> {
    return this.restService.get(this.RESOURCE_PREFIX);
  }

  getPlanById(planId: number): Observable<any> {
    return this.restService.get(`${this.RESOURCE_PREFIX}/${planId}`);
  }

  savePlan(plan: Plan): Observable<any> {
    return this.restService.post(this.RESOURCE_PREFIX, plan);
  }

  updatePlan(plan: Plan): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${plan.id}`, plan);
  }

  deletePlan(planId: number): Observable<any> {
    //this.plans = this.plans.filter(pln => pln !== plan);
    return this.restService.delete(`${this.RESOURCE_PREFIX}/${planId}`);
  }
}
