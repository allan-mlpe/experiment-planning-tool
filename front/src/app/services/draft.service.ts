import {Injectable} from '@angular/core';
import {Draft} from '../model/draft';
import {RestService} from './rest.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class DraftService {
  private readonly RESOURCE_PREFIX: string = 'drafts';

  constructor(private restService: RestService) {}

  getDrafts(params: any = {}): Observable<any> {
    return this.restService.get(this.RESOURCE_PREFIX, params);
  }

  getDraftById(draftId: number): Observable<any> {
    return this.restService.get(`${this.RESOURCE_PREFIX}/${draftId}`);
  }

  saveSimpleDraft(draft: Draft): Observable<any> {
    return this.restService.post(this.RESOURCE_PREFIX, draft);
  }

  saveFullDraft(draft: Draft): Observable<any> {
    return this.restService.post(`${this.RESOURCE_PREFIX}/full`, draft);
  }

  saveDraftCharacteristics(draft: Draft): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${draft.id}/characteristics`, draft);
  }

  saveDraftThreats(draft: Draft): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${draft.id}/threats`, draft);
  }

  saveDraftActions(draft: Draft): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${draft.id}/control-actions`, draft);
  }

  saveDraftGeneratedActions(draft: Draft): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${draft.id}/generated-threats`, draft);
  }

  updateDraft(draft: Draft): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${draft.id}`, draft);
  }

  deleteDraft(draftId: number): Observable<any> {
    return this.restService.delete(`${this.RESOURCE_PREFIX}/${draftId}`);
  }
}
