import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartiesRoutingModule } from './parties-routing.module';
import { PartiesDashboardComponent } from './parties-dashboard/parties-dashboard.component';
import { PartiesComponent } from './parties/parties.component';
import { DetailsPartieComponent } from './details-partie/details-partie.component';
import { ListPartiesComponent } from './list-parties/list-parties.component';
import {AngularMaterialModule} from '../angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [PartiesDashboardComponent, PartiesComponent, DetailsPartieComponent, ListPartiesComponent],
  imports: [
    CommonModule,
    PartiesRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class PartiesModule { }
