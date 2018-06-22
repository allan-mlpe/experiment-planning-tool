import {Injectable} from '@angular/core';
import {Plan} from '../model/plan';
import {RestService} from './rest.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class PlanService {
  private readonly RESOURCE_PREFIX: string = 'plans';

  constructor(private restService: RestService) {}

  getPlans(params: any = {}): Observable<any> {
    return this.restService.get(this.RESOURCE_PREFIX, params);
  }

  getPlanById(planId: number): Observable<any> {
    return this.restService.get(`${this.RESOURCE_PREFIX}/${planId}`);
  }

  getReviews(planId: number): Observable<any> {
    return this.restService.get(`${this.RESOURCE_PREFIX}/${planId}/reviews`);
  }

  savePlan(plan: Plan): Observable<any> {
    return this.restService.post(this.RESOURCE_PREFIX, plan);
  }

  savePlanCharacteristics(plan: Plan): Observable<any> {
    return this.restService.post(`${this.RESOURCE_PREFIX}/${plan.id}/characteristics`, plan);
  }

  savePlanThreats(plan: Plan): Observable<any> {
    return this.restService.post(`${this.RESOURCE_PREFIX}/${plan.id}/threats`, plan);
  }

  savePlanActions(plan: Plan): Observable<any> {
    return this.restService.post(`${this.RESOURCE_PREFIX}/${plan.id}/control-actions`, plan);
  }

  savePlanGeneratedActions(plan: Plan): Observable<any> {
    return this.restService.post(`${this.RESOURCE_PREFIX}/${plan.id}/generated-threats`, plan);
  }

  archivePlan(plan: Plan): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${plan.id}/archive`, plan);
  }

  updatePlan(plan: Plan): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${plan.id}`, plan);
  }

  updateStatus(plan: Plan) {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${plan.id}/status`, plan);
  }

  deletePlan(planId: number): Observable<any> {
    return this.restService.delete(`${this.RESOURCE_PREFIX}/${planId}`);
  }
}
