import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavComponent } from './layout/nav/nav.component';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import {GameComponent} from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    GameComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot([]), MatMenuModule, HttpClientModule, AngularMaterialModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
