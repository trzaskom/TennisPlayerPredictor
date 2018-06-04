
import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';

import { PlayersService } from '../players.service';
import { Player } from '../player';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-export-to-pdf',
  templateUrl: './export-to-pdf.component.html',
  styleUrls: ['./export-to-pdf.component.css']
})
export class ExportToPdfComponent implements OnInit {

  players: Player[];
  tournaments: String[] = ['aaa'];
  playersColumns = ['name', 'age', 'points', 'player_key'];

  @ViewChild('tournamentsContent') torunamentsDiv: ElementRef;
  @ViewChild('playersContent') playersDiv: ElementRef;

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
    this.playersService.getAllPlayers().subscribe(allPlayers => {
      this.players = allPlayers;
    });
  }

  downloadPlayersPdf() {
    console.log('DownloadPlayersPdf()');
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': (element, render) => {
        return true;
      }
    };

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
    // doc.autoTable(this.playersColumns, this.players);
    doc.save('rep-players.pdf');
  }

}
