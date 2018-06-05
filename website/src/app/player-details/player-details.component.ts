import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Player } from '../player';
import { PlayerStats } from '../player-stats';
import { PlayersService } from '../players.service';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as jsPDF from 'jspdf';

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

  messages: string[] = [];

  /*
    HO: string;
    HI: string;
    GO: string;
    GI: string;
    CO: string;
    CI: string;
  };
  */

  constructor(private playersService: PlayersService, private route: ActivatedRoute) {
  }

  @ViewChild('playerStatist') playerStatsDiv: ElementRef;

  ngOnInit() {
    this.route.params.subscribe(params => this.playerId = params.id);

    this.playersService.getOnePlayer(this.playerId).subscribe(onePlayer => {
      this.player = onePlayer[0];
    });
    this.playersService.getPlayerStats(this.playerId).subscribe(onePlayerStats => {
      this.playerStats = onePlayerStats[0];

      this.messages.push(this.playerStatsConcluson('hard outdor', onePlayerStats[0].hard_out));
      this.messages.push(this.playerStatsConcluson('hard indor', onePlayerStats[0].hard_in));
      this.messages.push(this.playerStatsConcluson('grass outdor', onePlayerStats[0].grass_out));
      this.messages.push(this.playerStatsConcluson('grass indor', onePlayerStats[0].grass_in));
      this.messages.push(this.playerStatsConcluson('clay outdor', onePlayerStats[0].clay_out));
      this.messages.push(this.playerStatsConcluson('clay indor', onePlayerStats[0].clay_in));
      /*
      this.messages.HO = this.playerStatsConcluson('HO', onePlayerStats[0].hard_out);
      this.messages.HI = this.playerStatsConcluson('HI', onePlayerStats[0].hard_in);
      this.messages.GO = this.playerStatsConcluson('GO', onePlayerStats[0].grass_out);
      this.messages.GI = this.playerStatsConcluson('GI', onePlayerStats[0].grass_in);
      this.messages.CO = this.playerStatsConcluson('CO', onePlayerStats[0].clay_out);
      this.messages.CI = this.playerStatsConcluson('CI', onePlayerStats[0].clay_in);
      */
    });

  }

  toggle() {
    this.statsExpanded = !this.statsExpanded;
    console.log(this.playerStats);
    console.log(this.messages);
  }

  playerStatsConcluson(statName: string, statValue: number) {
    if (statValue > 0.75) {
      return ('++ This player is doing very well on ' + statName + ' court.');
    } else if (statValue > 0.6) {
      return ('+ This player is doing rather good on ' + statName + ' court.');
    } else if (statValue > 0.3) {
      return ('- This player is doing average on ' + statName + ' court.');
    } else if (statValue === 0) {
      return (' This player doesn\'t play on ' + statName + ' court.');
    } else {
      return ('-- This player is doing poorly on ' + statName + ' court.');
    }
  }

  playerReport() {
    console.log('DownloadPlayersPdf()');
    if (this.player) {
      const doc = new jsPDF();
      /*
      const specialElementHandlers = {
        '#editor': (element, render) => {
          return true;
        }
      };
      */

      doc.setFontType('normal');
      doc.setFontSize(12);
      doc.setLineWidth(1);
      doc.setFontType('bold');
      doc.text(20, 20, 'NAME').text(110, 20, 'AGE').text(140, 20, 'POINTS').text(170, 20, 'KEY');
      doc.line(20, 25, 180, 25);
      doc.setFontType('normal');

      doc.text(20, 35, this.player.name).text(110, 35, this.player.age.toString())
        .text(140, 35, this.player.points.toString()).text(170, 35, this.player.player_key);

      doc.save('rep-' + this.player.player_key + '.pdf');
    } else {
      console.log('this.players is empty!');
    }
  }
}
