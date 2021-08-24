import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { map as _map, find as _find } from 'lodash';

import { ConfiqService } from './../../../shared/services/confiq.service';
import { environment } from './../../../../environments/environment';
import { Navigations } from '../../navgiation';

@Component({
  selector: 'app-root-default',
  templateUrl: './root-default.component.html',
  styleUrls: ['./root-default.component.scss']
})
export class RootDefaultComponent implements OnInit {
  private navigation = Navigations;

  constructor(
    private confiqService: ConfiqService,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      console.log(val);
    });
  }

  setRequiedCookcies(): void {
    this.confiqService.getGetIdentity().pipe(first()).subscribe(reponse => {
      this.confiqService.setCookie('client_id', reponse.TenantId);
      this.confiqService.setCookie('client_secret', reponse.ClientSecret);
    });
  }

  ngOnInit(): void {
    const TenantId = this.confiqService.getCookies('client_id');

    if (!TenantId) {
      this.setRequiedCookcies();
    } else if (TenantId !== environment.TenantId) {
      this.setRequiedCookcies();
    }

  }

}
