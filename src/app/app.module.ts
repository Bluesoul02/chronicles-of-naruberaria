import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {NavComponent} from './layout/nav/nav.component';
import {GameComponent} from './game/game.component';
import {AngularMaterialModule} from './angular-material.module';

@NgModule({
  declarations: [AppComponent, NavComponent, GameComponent],
  imports: [BrowserModule, RouterModule, AngularMaterialModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
