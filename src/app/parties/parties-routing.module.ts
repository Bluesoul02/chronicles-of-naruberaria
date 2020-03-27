import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PartiesComponent} from './parties/parties.component';
import {DetailsPartieComponent} from './details-partie/details-partie.component';
import {ListPartiesComponent} from './list-parties/list-parties.component';
import {PartiesDashboardComponent} from './parties-dashboard/parties-dashboard.component';


const adminRoutes: Routes = [
  {
    path: 'parties',
    component: PartiesComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'list', component: ListPartiesComponent },
          { path: ':id', component: DetailsPartieComponent },
          { path: '', component: PartiesDashboardComponent }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class PartiesRoutingModule { }
