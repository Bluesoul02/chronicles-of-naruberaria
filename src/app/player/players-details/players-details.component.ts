import {Component, OnInit} from '@angular/core';
import {Player} from '../../models/player.model';
import {PlayersService} from '../players.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-players-details',
  templateUrl: './players-details.component.html',
  styleUrls: ['./players-details.component.css']
})
export class PlayersDetailsComponent implements OnInit {
  loading = false;
  player: Player;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: PlayersService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.service.getPlayer(id).subscribe(rep => {
        console.log(rep);
        this.player = rep;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastr.error(`${error} failed: ${error.message}`, 'Error')
          .onHidden
          .subscribe(t => this.router.navigate(['./player/liste']));
      });
  }

  editPlayer() {
    this.router.navigate(['./player/edit', this.player.id]);
  }

}
