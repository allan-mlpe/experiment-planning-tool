import { Injectable } from '@angular/core';
import { Headers, RequestOptions, URLSearchParams, Response, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestService {

  protected serverUrl: string;

  private readonly AUTH_TOKEN_HEADER: string = "X-AUTH-TOKEN";
  private readonly SERVER_PORT: string = "9000";

  constructor(protected http: HttpClient, private authService: AuthService, private router: Router) {
      this.serverUrl = `${window.location.origin}/api`;
  }

  public set token(value: string){
    this.authService.token = value;
  }

  public get token(){
    //return this.authenticationService.token;
    return '';
  }

  protected resolve(path: string): string {
    //return this.serverUrl + '/' + path;
    return path;
  }

  protected extract = (res: Response) => {
      let body;
      try {
          body = res.json();
      } catch(e) {
          body = {};
      }
      
      return body;
  }

  protected createRequestOptions(queryString?: any): any {
      var options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });

      if(queryString){
          options.params = this.createSearchParams(queryString);

      }
      if(this.authService.isUserAuthenticated){
          options.headers.append(this.AUTH_TOKEN_HEADER, this.authService.token);
      }
      return options;
  }

  protected createSearchParams(urlParams: any): URLSearchParams{
      let urlSearchParams = new URLSearchParams();

      for (let key in urlParams) {
          urlSearchParams.append(key, urlParams[key]);
      }

      return urlSearchParams;
  }

  getHeaders() {
     return new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
    })
  }

  public get(url: string, queryString?: any, data?: any): Observable<any> {
      var options = this.createRequestOptions(queryString);
      options.body = JSON.stringify(data || {});
      var response = this.http.get(this.resolve(url), options);
      this.authService.lastRequest = new Date();
      return response;
  }

  /*
  public post<TResponse>(url: string, queryString?: any, data?: any): Observable<TResponse> {
      var options = this.createRequestOptions(queryString);
      var response = this.http.post(this.resolve(url), JSON.stringify(data || {}) , options);
      this.authService.lastRequest = new Date();
      return response.map(this.extract).catch(x => {
          if (JSON.parse(x._body).systemCode === 495) {
              this.authService.doLogout();
              this.router.navigate(['login']);
          } else if (x.status === 401) {
              this.authService.doLogout();
              this.router.navigate(['login', 'expired']);
          }
          return response;
      });
  }

  public put<TResponse>(url: string, queryString?: any, data?: any): Observable<TResponse> {
      var options = this.createRequestOptions(queryString);
      var response = this.http.put(this.resolve(url),JSON.stringify(data || {}), options);
      this.authService.lastRequest = new Date();
      return response.map(this.extract).catch(x => {
          if(x.status === 401){
              this.authService.doLogout();
              this.router.navigate(['login', 'expired']);
          }

          return response;
      });
  }

  public delete<TResponse>(url: string, queryString?: any, data?: any): Observable<TResponse> {
      var options = this.createRequestOptions(queryString);
      options.body = JSON.stringify(data || {});
      var response = this.http.delete(this.resolve(url),  options);
      this.authService.lastRequest = new Date();
      return response.map(this.extract).catch(x => {
          if(x.status === 401){
              this.authService.doLogout();
              this.router.navigate(['login', 'expired']);
          }
          return response;
      });
  }

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
