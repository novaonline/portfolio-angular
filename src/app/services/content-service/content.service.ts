import { Content } from './../../models/content/content';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContentService {

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
