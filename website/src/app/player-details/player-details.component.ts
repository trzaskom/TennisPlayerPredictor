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

      this.messages.push(this.playerStatsConclusion('hard outdoor', onePlayerStats[0].hard_out));
      this.messages.push(this.playerStatsConclusion('hard indoor', onePlayerStats[0].hard_in));
      this.messages.push(this.playerStatsConclusion('grass outdoor', onePlayerStats[0].grass_out));
      this.messages.push(this.playerStatsConclusion('grass indoor', onePlayerStats[0].grass_in));
      this.messages.push(this.playerStatsConclusion('clay outdoor', onePlayerStats[0].clay_out));
      this.messages.push(this.playerStatsConclusion('clay indoor', onePlayerStats[0].clay_in));
    });

  }

  toggle() {
    this.statsExpanded = !this.statsExpanded;
    console.log(this.playerStats);
    console.log(this.messages);
  }

  playerStatsConclusion(statName: string, statValue: number) {
    if (statValue > 0.75) {
      return ('++ This player is doing very well on ' + statName + ' court.');
    } else if (statValue > 0.6) {
      return ('+ This player is doing rather good on ' + statName + ' court.');
    } else if (statValue > 0.3) {
      return ('- This player is doing average on ' + statName + ' court.');
    } else if (statValue === 0) {
      return (' This player is yet to play on ' + statName + ' court.');
    } else {
      return ('-- This player is doing poorly on ' + statName + ' court.');
    }
  }

  playerReport() {
    console.log('DownloadPlayersPdf()');
    if (this.player) {
      const doc = new jsPDF();

      doc.setFontType('normal');
      doc.setFontSize(12);
      doc.setLineWidth(1);

      doc.setFontType('bold');
      doc.text(20, 20, 'NAME').text(110, 20, 'AGE').text(140, 20, 'POINTS').text(170, 20, 'KEY');
      doc.line(20, 25, 180, 25);

      doc.setFontType('normal');
      doc.text(20, 35, this.player.name).text(110, 35, this.player.age.toString())
        .text(140, 35, this.player.points.toString()).text(170, 35, this.player.player_key);

      doc.setFontType('bold');

      doc.setFontSize(16);
      doc.text(20, 65, 'Player\'s Skill:');

      doc.setFontSize(12);
      doc.text(20, 80, 'Hard Outdoor:').text(20, 95, 'Hard Indoor:').text(20, 110, 'Grass Outdoor:')
        .text(20, 125, 'Grass Indoor:').text(20, 140, 'Clay Outdoor:').text(20, 155, 'Clay Indoor:');

      doc.setFontType('normal');
      doc.text(60, 80, (this.playerStats.hard_out * 100).toFixed(2) + '%')
        .text(60, 95, (this.playerStats.hard_in * 100).toFixed(2) + '%')
        .text(60, 110, (this.playerStats.grass_out * 100).toFixed(2) + '%')
        .text(60, 125, (this.playerStats.grass_in * 100).toFixed(2) + '%')
        .text(60, 140, (this.playerStats.clay_out * 100).toFixed(2) + '%')
        .text(60, 155, (this.playerStats.clay_in * 100).toFixed(2) + '%');

      doc.setFontType('normal');
      doc.text(20, 180, this.playerStatsConclusion('hard outdoor', this.playerStats.hard_out))
        .text(20, 195, this.playerStatsConclusion('hard indoor', this.playerStats.hard_in))
        .text(20, 210, this.playerStatsConclusion('grass outdoor', this.playerStats.grass_out))
        .text(20, 225, this.playerStatsConclusion('grass indoor', this.playerStats.grass_in))
        .text(20, 240, this.playerStatsConclusion('clay outdoor', this.playerStats.clay_out))
        .text(20, 255, this.playerStatsConclusion('clay indoor', this.playerStats.clay_in));


      doc.save('rep-' + this.player.player_key + '.pdf');
    } else {
      console.log('this.players is empty!');
    }
  }
}
