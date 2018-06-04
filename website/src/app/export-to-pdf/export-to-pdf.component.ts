
import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';

import { PlayersService } from '../players.service';
import { Player } from '../player';

import * as jsPDF from 'jspdf';
import { TournamentsService } from '../tournaments.service';
import { Tournament } from '../tournament';

@Component({
  selector: 'app-export-to-pdf',
  templateUrl: './export-to-pdf.component.html',
  styleUrls: ['./export-to-pdf.component.css']
})
export class ExportToPdfComponent implements OnInit {

  players: Player[];
  playersColumns = ['name', 'age', 'points', 'player_key'];

  tournaments: Tournament[];
  tournamentsdColumns = ['tournamentName', 'location', 'placement', 'surface', 'winnerName'];

  @ViewChild('tournamentsContent') torunamentsDiv: ElementRef;
  @ViewChild('playersContent') playersDiv: ElementRef;

  constructor(
    private playersService: PlayersService,
    private tournamentsService: TournamentsService,
  ) { }

  ngOnInit() {
    this.playersService.getAllPlayers().subscribe(allPlayers => {
      this.players = allPlayers;
    });
    this.tournamentsService.getAllTournaments().subscribe(allTournaments => {
      this.tournaments = allTournaments;
    });
  }

  downloadPlayersPdf() {
    console.log('DownloadPlayersPdf()');

    const doc = new jsPDF();

    doc.setFontType('normal');
    doc.setFontSize(12);
    doc.setLineWidth(1);

    let height = 35;
    doc.text(20, 20, 'NAME').text(110, 20, 'AGE').text(140, 20, 'POINTS').text(170, 20, 'KEY');
    doc.line(20, 25, 180, 25);
    if (this.players.length > 0) {
      this.players.forEach(player => {
        if (height > 280) {
          height = 35;
          doc.addPage();
          doc.setFontType('bold');
          doc.text(20, 20, 'NAME').text(110, 20, 'AGE').text(140, 20, 'POINTS').text(170, 20, 'KEY');
          doc.line(20, 25, 180, 25);
          doc.setFontType('normal');
        } else {
          doc.text(20, height, player.name).text(110, height, player.age.toString())
            .text(140, height, player.points.toString()).text(170, height, player.player_key);
          height += 10;
        }
      });
    } else {
      console.log('this.players is empty!');
    }
    doc.save('rep-players.pdf');
  }

  downloadTournamentsPdf() {
    console.log('DownloadTournamentsPdf()');

    const doc = new jsPDF();

    doc.setFontType('normal');
    doc.setFontSize(9);
    doc.setLineWidth(1);

    let height = 35;
    doc.text(10, 20, 'Torunament Name').text(75, 20, 'Location').
      text(120, 20, 'Placement').text(145, 20, 'Surface').text(160, 20, 'Winner Name');
    doc.line(10, 25, 200, 25);
    if (this.tournaments.length > 0) {
      this.tournaments.forEach(tournament => {
        if (height > 280) {
          height = 35;
          doc.addPage();
          doc.setFontType('bold');
          doc.text(10, 20, 'Torunament Name').text(75, 20, 'Location').
            text(120, 20, 'Placement').text(145, 20, 'Surface').text(160, 20, 'Winner Name');
          doc.line(10, 25, 200, 25);
          doc.setFontType('normal');
        } else {
          doc.text(10, height, tournament.tournamentName).text(75, height, tournament.location.toString())
            .text(120, height, tournament.placement.toString()).text(145, height, tournament.surface)
            .text(160, height, tournament.winnerName);
          height += 9;
        }
      });
    } else {
      console.log('this.tournaments is empty!');
    }
    doc.save('rep-tournaments.pdf');
  }
}
