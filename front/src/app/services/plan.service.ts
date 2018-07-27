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

  saveCustomPlan(formData: FormData): Observable<any> {
    return this.restService.submitMultipartFormData(`${this.RESOURCE_PREFIX}/custom`, formData);
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

  unarchivePlan(plan: Plan): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${plan.id}/unarchive`, plan);
  }

  createNewVersion(plan: Plan): Observable<any> {
    return this.restService.post(`${this.RESOURCE_PREFIX}/${plan.id}`, {});
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

  downloadPlan(planId: number, fileName: string) {
    return this.restService.download(`${this.RESOURCE_PREFIX}/${planId}/file`, fileName, 'application/octet-stream');
  }

  downloadReport(planId: number, fileName: string) {
    return this.restService.download(`${this.RESOURCE_PREFIX}/download-report/${planId}`, fileName, 'application/octet-stream');
  }
}
