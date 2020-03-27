import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID} from '@angular/core';
import { NavComponent } from './layout/nav/nav.component';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AngularMaterialModule} from './angular-material.module';
import {GameComponent} from './game/game.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeModule} from './home/home.module';
import {AuthModule} from './auth/auth.module';
import {PlayersModule} from './player/players.module';
import {AuthService} from './shared/auth.service';
import {HttpErrorInterceptorService} from './shared/http-error-interceptor.service';
import {TokenInterceptorService} from './shared/token-interceptor.service';
import {routes} from './app-routing.module';
import {PartiesModule} from './parties/parties.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    GameComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatMenuModule,
    HttpClientModule,
    AngularMaterialModule,
    HomeModule,
    AuthModule,
    PlayersModule,
    PartiesModule
  ],
  providers: [AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    [{provide: LOCALE_ID, useValue: 'fr-FR'}]],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
