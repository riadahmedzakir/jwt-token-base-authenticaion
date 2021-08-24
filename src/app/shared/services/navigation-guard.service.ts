// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { ConfiqService } from './confiq.service';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {

  constructor(
    private confiqService: ConfiqService,
    private router: Router
  ) { }

  canActivate(route: any, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable(observer => {
      const redirectUrl = route._routerState.url;

      const refreshToken = this.confiqService.getCookies('refresh_token');

      if (refreshToken) {
        this.confiqService.getToken('refresh_token').pipe(first()).subscribe(res => {
          if (!res) {
            if (redirectUrl === '/login') {
              observer.next(true);
            }
            observer.next(false);
          }

          if (res && res.access_token) {
            this.confiqService.setCookie('access_token', res.access_token);
            this.confiqService.setCookie('refresh_token', res.refresh_token);

            const userInfo = this.confiqService.getDecodedAccessToken(res.access_token);
            const userRoles = userInfo.Roles;
            const isApplicationUser = userRoles.indexOf('appuser') > -1;

            if (isApplicationUser && redirectUrl !== '/login') {
              observer.next(true);
            } else if (isApplicationUser && redirectUrl === '/login') {
              this.router.navigate(['/home']);
              observer.next(false);
            }
          }
        });
      } else {
        if (redirectUrl === '/login') {
          observer.next(true);
        } else {
          this.router.navigate(['/login']);
          observer.next(false);
        }
      }
    });
  }
}
