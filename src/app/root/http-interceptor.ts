import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {


        if (req.url.indexOf('anonymousToken') > -1) {
            req = req.clone({
                withCredentials: false
            });
        } else {
            const token = localStorage.getItem('anonyomousToken');
            req = req.clone({
                withCredentials: false,
                headers: req.headers.set('Authorization', `bearer ${token}`)
            });
        }

        return next.handle(req);
    }
}
