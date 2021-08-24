import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { ConfiqService } from './../../../shared/services/confiq.service';

@Component({
  selector: 'app-login-default',
  templateUrl: './login-default.component.html',
  styleUrls: ['./login-default.component.scss']
})
export class LoginDefaultComponent implements OnInit {
  patterns = this.confiqService.getPatternConfig();
  loginDisabled = false;
  isInactive: false;
  password: string;
  username: string;

  constructor(
    private confiqService: ConfiqService,
    private router: Router
  ) { }

  login(): void {
    this.confiqService.getToken('password', this.username, this.password).pipe(first()).subscribe(res => {
      if (res) {
        const accessToken = res.access_token;
        const refreshToken = res.refresh_token;

        this.confiqService.setCookie('access_token', accessToken);
        this.confiqService.setCookie('refresh_token', refreshToken);

        const userInfo = this.confiqService.getDecodedAccessToken(accessToken);
        const userRoles = userInfo.Roles;
        const isApplicationUser = userRoles.indexOf('appuser') > -1;
        console.log(isApplicationUser);

        if (isApplicationUser) {
          this.router.navigate(['/home']);
        }
      } else {
        console.log(res);
      }
    });
  }

  logout(): void {

  }

  homepage(): void {

  }

  ngOnInit(): void {

  }

}
