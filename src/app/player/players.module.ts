import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayersRoutingModule} from './players-routing.module';
import { ListPlayersComponent } from './list-player/list-players.component';
import { PlayersComponent } from './players/players.component';
import { PlayersHomeComponent } from './players-home/players-home.component';
import { PlayersDetailsComponent } from './players-details/players-details.component';
import {AngularMaterialModule} from '../angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ToastrModule} from 'ngx-toastr';
import { EditPlayerComponent } from './edit-player/edit-player.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import { FormPlayerComponent } from './form-player/form-player.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuteurGuardService} from '../shared/auteur-guard.service';



@NgModule({
  declarations: [ListPlayersComponent, PlayersComponent, PlayersHomeComponent, PlayersDetailsComponent,
    EditPlayerComponent, FormPlayerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlayersRoutingModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
    AngularMaterialModule,
    MaterialFileInputModule,
  ],
  providers: [AuteurGuardService]
})
export class PlayersModule { }
