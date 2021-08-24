import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginDefaultComponent } from './components/login-default/login-default.component';
import { MaterialModule } from '../shared/material.module';

const routes: Routes = [
  {
    path: '',
    component: LoginDefaultComponent
  }
];

@NgModule({
  declarations: [LoginDefaultComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule
  ]
})
export class LoginModule { }
