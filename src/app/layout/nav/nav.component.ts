import { Component, OnInit } from '@angular/core';
import {Player} from '../../models/player.model';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  currentPlayer: Player;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentPlayer.subscribe(x => this.currentPlayer = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
