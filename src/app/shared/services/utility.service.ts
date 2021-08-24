import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  changetitle(title: string): void {
    document.getElementsByTagName('title')[0].innerHTML = title;
  }
}
