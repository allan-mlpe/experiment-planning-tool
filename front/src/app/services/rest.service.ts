import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, timeout} from "rxjs/operators";
import {ApiMessage} from '../model/pcvt-message';
import {TimeoutError} from 'rxjs/Rx';

@Injectable()
export class RestService {
  // constants
  private readonly AUTH_TOKEN_HEADER: string = "X-AUTH-TOKEN";
  private readonly SERVER_URL: string = 'http://127.0.0.1:7007/api/';
  private readonly JSON_CONTENT_TYPE: string = 'application/json';
  private readonly FORM_CONTENT_TYPE: string = 'application/x-www-form-urlencoded';
  private readonly REQUEST_TIMEOUT: number = 30000;

  constructor(protected http: HttpClient, private router: Router) {}

  public get(url: string, queryParams?: any): Observable<any>{
    const options = this.createRequestOptions(queryParams);
    let request = this.http.get(this.resolve(url), options);

    return this.handleRequestResponse(request);
  }

  public post(url: string, data: any): Observable<any> {
    const options = this.createRequestOptions();
    let request = this.http.post(this.resolve(url), data, options);

    return this.handleRequestResponse(request);
  }

  public put(url: string, data: any): Observable<any> {
    const options = this.createRequestOptions();
    let request = this.http.put(this.resolve(url), data, options);

    return this.handleRequestResponse(request);
  }

  public delete(url: string) {
    const options = this.createRequestOptions();
    let request = this.http.delete(this.resolve(url), options);

    return this.handleRequestResponse(request);
  }

  public submitFormData(url: string, formData: FormData|any): Observable<any> {
    const options = this.createRequestOptions({}, this.FORM_CONTENT_TYPE);

    const payload = Object.keys(formData).map(
      key => `${key}=${formData[key]}`)
      .join('&');

    const request = this.http.post(this.resolve(url), payload, options);

    return this.handleRequestResponse(request);
  }

  private createRequestOptions(queryParams = {}, contentType = this.JSON_CONTENT_TYPE): any {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', contentType)
      .set(this.AUTH_TOKEN_HEADER, 'MY_TOKEN');

    const params: HttpParams = new HttpParams({
      fromObject: queryParams
    });

    const options = {
      headers: headers,
      params: params
    };

    return options;
  }

  handleRequestResponse(request): Observable<any> {
    const self = this;
    return request.pipe(
      timeout(self.REQUEST_TIMEOUT),
      map(res => res),
      catchError((err) => {
        throw this.handleError(err);
      })
    );
  }

  handleError(err: any): any {
    // if token is expired
    if(err.status === 401) {
      this.router.navigate(['/login']);
    }

    let message: ApiMessage;

    if(err.error && err.error.message) {
      message = <ApiMessage> err.error;
    } else if(err instanceof TimeoutError) {
      message = new ApiMessage(408,
        'The server is taking to long to respond, please try again in sometime',
        'Timeout');
    } else {
      message = new ApiMessage(err.status, 'Unknown error, try again', err.statusText);
    }

    return message;
  }

  protected resolve(path: string): string {
    return this.SERVER_URL + path;
  }

  /*
  public download(url: string, type: string, queryString?: any, data?: any): Observable<any> {
      var options = this.createRequestOptions(queryString);
      options.responseType = ResponseContentType.Blob;
      this.authService.lastRequest = new Date();
      var response = this.http.get(this.resolve(url), options);

      response.subscribe(
          data => {
              var blob: any = new Blob([data.blob()], { type: type })
              window.open(window.URL.createObjectURL(blob));
          },
          error => console.log("Error downloading the file."),
      );

      return response;
  }*/
}
