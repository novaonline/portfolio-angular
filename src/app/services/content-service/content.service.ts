import { Content } from './../../models/content/content';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class ContentService /*implements HttpInterceptor*/{

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const crossOriginReq = req.clone({headers: req.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000')});
  //   return next.handle(crossOriginReq);
  // }

  private _baseUrl: string = `http://equagraineapi.azurewebsites.net/api/`;

  constructor(private _http: HttpClient) { }

  getEducation(): Observable<Content> {
    return this.getByPath('content/2');
  }

  getInterests() : Observable<Content> {
    return this.getByPath('content/3');
  }

  getProjects() : Observable<Content> {
    return this.getByPath('content/4');
  }

  getExperience(): Observable<Content> {
    return this.getByPath('content/5');
  }

  getContact(): Observable<Content> {
    return this.getByPath('content/6');
  }

  private getByPath(path: string) : Observable<any> {
    return this._http.get<Content>(`${this._baseUrl}${path}`);
  }
}
