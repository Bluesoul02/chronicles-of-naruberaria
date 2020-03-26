import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../shared/auth-guard.service';
import {ListPlayersComponent} from './list-player/list-players.component';
import {PlayersComponent} from './players/players.component';
import {PlayersHomeComponent} from './players-home/players-home.component';
import {PlayersDetailsComponent} from './players-details/players-details.component';
import {EditPlayerComponent} from './edit-player/edit-player.component';
import {AuteurGuardService} from '../shared/auteur-guard.service';

const playersRoutes: Routes = [
  {
    path: 'player',
    component: PlayersComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: 'liste', component: ListPlayersComponent},
      {path: ':id', component: PlayersDetailsComponent, canActivateChild: [AuteurGuardService]},
      {path: 'edit/:id', component: EditPlayerComponent, canActivateChild: [AuthGuardService]},
      {path: '', component: PlayersHomeComponent}
    ]
  },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(playersRoutes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule {
}
