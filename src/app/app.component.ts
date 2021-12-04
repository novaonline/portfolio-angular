import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { authImplicityFlowConfig } from './auth-implicit-flow.config';
import { authCodeFlowConfig } from './auth-code-flow.config';
import { useHash } from '../flags';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portfolio UI';
  userProfile: object = {};

    // TODO: Move all Identity related stuff to its own component
  constructor(private router: Router, private oauthService: OAuthService) {
    // Remember the selected configuration
    if (sessionStorage.getItem('flow') === 'code') {
      this.configureCodeFlow();
    } else {
      this.configureImplicitFlow();
    }

    // Automatically load user profile
    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        console.debug('state', this.oauthService.state);
        this.oauthService.loadUserProfile();
      });
  }

  private configureCodeFlow() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      if (useHash) {
        this.router.navigate(['/']);
      }
    });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();
  }

  private configureImplicitFlow() {
    this.oauthService.configure(authImplicityFlowConfig);
    this.oauthService.setStorage(localStorage);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      if (useHash) {
        this.router.navigate(['/']);
      }
    });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();

    // Display all events
    this.oauthService.events.subscribe(e => {
      // tslint:disable-next-line:no-console
      console.debug('oauth/oidc event', e);
    });

    this.oauthService.events
      .pipe(filter(e => e.type === 'session_terminated'))
      .subscribe(e => {
        // tslint:disable-next-line:no-console
        console.debug('Your session has been terminated!');
      });
  }

  async loginImplicit() {
    // Tweak config for implicit flow
    this.oauthService.configure(authImplicityFlowConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'implicit');

    this.oauthService.initLoginFlow('/some-state;p1=1;p2=2?p3=3&p4=4');
    // the parameter here is optional. It's passed around and can be used after logging in
  }

  async loginImplicitInPopup() {
    // Tweak config for implicit flow
    this.oauthService.configure(authImplicityFlowConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'implicit');

    this.oauthService.initLoginFlowInPopup().then(() => {
      this.loadUserProfile();
    });
    // the parameter here is optional. It's passed around and can be used after logging in
  }

  async loginCode() {
    // Tweak config for code flow
    this.oauthService.configure(authCodeFlowConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'code');

    this.oauthService.initLoginFlow('/some-state;p1=1;p2=2?p3=3&p4=4');
    // the parameter here is optional. It's passed around and can be used after logging in
  }

  async loginCodeInPopup() {
    // Tweak config for code flow
    this.oauthService.configure(authCodeFlowConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'code');

    this.oauthService.initLoginFlowInPopup().then(() => {
      this.loadUserProfile();
    });
  }

  logout() {
    // this.oauthService.logOut();
    this.oauthService.revokeTokenAndLogout();
  }

  loadUserProfile(): void {
    this.oauthService.loadUserProfile().then(up => (this.userProfile = up));
  }

  get givenName() {
    var claims : any = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['name'];
  }

  get familyName() {
    var claims : any = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['family_name'];
  }

  refresh() {
    this.oauthService.oidc = true;

    if (
      !this.oauthService.useSilentRefresh &&
      this.oauthService.responseType === 'code'
    ) {
      this.oauthService
        .refreshToken()
        .then(info => console.debug('refresh ok', info))
        .catch(err => console.error('refresh error', err));
    } else {
      this.oauthService
        .silentRefresh()
        .then(info => console.debug('silent refresh ok', info))
        .catch(err => console.error('silent refresh error', err));
    }
  }

  set requestAccessToken(value: boolean) {
    this.oauthService.requestAccessToken = value;
    localStorage.setItem('requestAccessToken', '' + value);
  }

  get requestAccessToken() {
    return this.oauthService.requestAccessToken ?? false;
  }

  set useHashLocationStrategy(value: boolean) {
    const oldValue = localStorage.getItem('useHashLocationStrategy') === 'true';
    if (value !== oldValue) {
      localStorage.setItem('useHashLocationStrategy', value ? 'true' : 'false');
      window.location.reload();
    }
  }

  get useHashLocationStrategy() {
    return localStorage.getItem('useHashLocationStrategy') === 'true';
  }

  get id_token() {
    return this.oauthService.getIdToken();
  }

  get access_token() {
    return this.oauthService.getAccessToken();
  }

  get id_token_expiration() {
    return this.oauthService.getIdTokenExpiration();
  }

  get access_token_expiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

}
