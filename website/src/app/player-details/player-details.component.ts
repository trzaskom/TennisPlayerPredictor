import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  player: Player;
  playerId: string;

  constructor(private playersService: PlayersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.playerId = params.id);

    this.playersService.getOnePlayer(this.playerId).subscribe(onePlayer => {
      this.player = onePlayer[0];
    });
  }
}
