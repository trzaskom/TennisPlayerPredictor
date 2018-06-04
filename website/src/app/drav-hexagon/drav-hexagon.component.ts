import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import { PlayerStats } from '../player-stats';


@Component({
  selector: 'app-drav-hexagon',
  templateUrl: './drav-hexagon.component.html',
  styleUrls: ['./drav-hexagon.component.css']
})
export class DravHexagonComponent implements OnInit {

  @Input()
  playerStats: PlayerStats;

  @ViewChild('myCanvas') canvasRef: ElementRef;

  constructor() { }

  ngOnInit() {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    // canvas settings
    ctx.fillStyle = '#66bb6a'; // sets the color to fill in the rectangle with
    ctx.strokeStyle = '#303f9f'; // sets the color to fill in the rectangle with
    ctx.lineWidth = 3;
    // players stats on hexagon
    ctx.beginPath();
    ctx.moveTo(225, 250 - this.playerStats.grass_out * 200);
    ctx.lineTo(225 + this.playerStats.clay_out * 173.2, 250 - this.playerStats.clay_out * 100);
    ctx.lineTo(225 + this.playerStats.clay_in * 173.2, 250 + this.playerStats.clay_in * 100);
    ctx.lineTo(225, 250 + this.playerStats.grass_in * 100);
    ctx.lineTo(225 - this.playerStats.hard_in * 173.2, 250 + this.playerStats.hard_in * 100);
    ctx.lineTo(225 - this.playerStats.hard_out * 173.2, 250 - this.playerStats.hard_out * 100);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    // outside hexagon
    ctx.beginPath();
    ctx.moveTo(225, 50);
    ctx.lineTo(398.2, 150);
    ctx.lineTo(398.2, 350);
    ctx.lineTo(225, 450);
    ctx.lineTo(51.8, 350);
    ctx.lineTo(51.8, 150);
    ctx.closePath();
    ctx.stroke();
    // inside hexagon
    ctx.beginPath();
    ctx.moveTo(225, 150);
    ctx.lineTo(311.6, 200);
    ctx.lineTo(311.6, 300);
    ctx.lineTo(225, 350);
    ctx.lineTo(138.4, 300);
    ctx.lineTo(138.4, 200);
    ctx.closePath();
    ctx.stroke();
    // lines inside
    ctx.lineWidth = 1.5;
    ctx.moveTo(225, 250);
    ctx.lineTo(225 + this.playerStats.clay_out * 173.2, 250 - this.playerStats.clay_out * 100);
    ctx.moveTo(225, 250);
    ctx.lineTo(225 + this.playerStats.clay_in * 173.2, 250 + this.playerStats.clay_in * 100);
    ctx.moveTo(225, 250);
    ctx.lineTo(225, 250 + this.playerStats.grass_in * 100);
    ctx.moveTo(225, 250);
    ctx.lineTo(225 - this.playerStats.hard_in * 173.2, 250 + this.playerStats.hard_in * 100);
    ctx.moveTo(225, 250);
    ctx.lineTo(225 - this.playerStats.hard_out * 173.2, 250 - this.playerStats.hard_out * 100);
    ctx.moveTo(225, 250);
    ctx.lineTo(225, 250 - this.playerStats.grass_out * 200);
    ctx.stroke();
    // text
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.font = '24px serif';

    ctx.moveTo(225, 50);
    ctx.lineTo(398.2, 150);
    ctx.lineTo(398.2, 350);
    ctx.lineTo(225, 450);
    ctx.lineTo(51.8, 350);
    ctx.lineTo(51.8, 150);

    ctx.fillText('GO', 225, 40);
    ctx.fillText('CO', 420, 155);
    ctx.fillText('CI', 415, 365);
    ctx.fillText('GI', 225, 475);
    ctx.fillText('HI', 30, 365);
    ctx.fillText('HO', 30, 155);
  }

}
