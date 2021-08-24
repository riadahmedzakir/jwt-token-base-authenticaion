import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { map as _map, find as _find } from 'lodash';

import { environment } from './../../../environments/environment';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ConfiqService {
  strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
  email = '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$';

  patterns = {
    Password: this.strongRegex,
    Email: this.email
  };

  constructor(
    private http: HttpClient
  ) { }

  getCookies(type: string): string {
    const currentCookies = _map(document.cookie.split(';'), (o) => o.trim());
    const regex = new RegExp(type, 'i');
    let requestCookieValue = null;

    _find(currentCookies, (o) => {
      if (o.match(regex)) {
        requestCookieValue = o.split('=')[1];
      }
    });

    return requestCookieValue;
  }

  setCookie(type: string, value: string): void {
    document.cookie = `${type}=${value}`;
  }

  getGetIdentity(): Observable<any> {
    return this.http.get<any>(environment.Identity + 'GetIdentity', {});
  }

  getToken(granttype: string, username?: string, password?: string): Observable<any> {
    return new Observable(observer => {
      switch (granttype) {
        case 'refresh_token':

          const refreshTokenData = `client_id=${this.getCookies('client_id')}&client_secret=${this.getCookies('client_secret')}&grant_type=refresh_token&refresh_token=${this.getCookies('refresh_token')}`;
          this.http.post<any>(environment.Token, refreshTokenData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).pipe(first()).subscribe(res => {
            observer.next(res);
          }, error => {
            observer.next(false);
          });

          break;
        case 'password':
          const passwordTokenData = `client_id=${this.getCookies('client_id')}&client_secret=${this.getCookies('client_secret')}&grant_type=password&username=${username}&password=${password}`;
          this.http.post<any>(environment.Token, passwordTokenData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).pipe(first()).subscribe(res => {
            observer.next(res);
          }, error => {
            observer.next(false);
          });
          break;
        default:
          observer.next(false);
      }
    });
  }

  getPatternConfig(): any {
    return this.patterns;
  }


  getDecodedAccessToken(token: string): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(token);
  }
}
