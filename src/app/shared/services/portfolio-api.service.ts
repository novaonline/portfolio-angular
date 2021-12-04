import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PortfolioExperience } from '../portfolio-experience';
import { PortfolioProfile } from '../portfolio-profile';
import { PortfolioResponse } from '../portfolio-response';

@Injectable({
  providedIn: 'root'
})
export class PortfolioApiService {

  url = 'https://equagraineapi.azurewebsites.net/api';

  constructor(private http: HttpClient, private oauthService: OAuthService) { 
    // Display all events
    this.oauthService.events.subscribe(e => {
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      })
    });

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
    })
  }

  getProfile(profileId: number): Observable<PortfolioResponse<PortfolioProfile>> {
    return this.http.get<PortfolioResponse<PortfolioProfile>>(`${this.url}/Profile/${profileId}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getExperience(profileId: number): Observable<PortfolioResponse<PortfolioExperience>> {
    return this.http.get<PortfolioResponse<PortfolioExperience>>(`${this.url}/Experience/${profileId}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // Error handling 
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
