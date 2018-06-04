import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerStats } from '../player-stats';
import { PlayersService } from '../players.service';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  player: Player;
  playerId: string;
  playerStats: PlayerStats;
  statsExpanded = false;
  constructor(private playersService: PlayersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.playerId = params.id);

    this.playersService.getOnePlayer(this.playerId).subscribe(onePlayer => {
      this.player = onePlayer[0];
    });
    this.playersService.getPlayerStats(this.playerId).subscribe(onePlayerStats => {
      this.playerStats = onePlayerStats[0];
    });
  }

  toggle() {
    this.statsExpanded = !this.statsExpanded;
    console.log(this.playerStats);
  }
}
