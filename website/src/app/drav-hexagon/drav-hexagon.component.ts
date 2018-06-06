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

  @Input()
  scale: number;

  @ViewChild('myCanvas') canvasRef: ElementRef;

  constructor() { }

  ngOnInit() {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    // canvas settings
    ctx.fillStyle = '#66bb6a'; // sets the color to fill in the rectangle with
    ctx.strokeStyle = '#303f9f'; // sets the color to fill in the rectangle with
    ctx.lineWidth = this.scale * 3;
    // players stats on hexagon
    ctx.beginPath();
    ctx.moveTo(this.scale * 225, this.scale * (250 - this.playerStats.grass_out * 200));
    ctx.lineTo(this.scale * (225 + this.playerStats.clay_out * 173.2), this.scale * (250 - this.playerStats.clay_out * 100));
    ctx.lineTo(this.scale * (225 + this.playerStats.clay_in * 173.2), this.scale * (250 + this.playerStats.clay_in * 100));
    ctx.lineTo(this.scale * 225, this.scale * (250 + this.playerStats.grass_in * 100));
    ctx.lineTo(this.scale * (225 - this.playerStats.hard_in * 173.2), this.scale * (250 + this.playerStats.hard_in * 100));
    ctx.lineTo(this.scale * (225 - this.playerStats.hard_out * 173.2), this.scale * (250 - this.playerStats.hard_out * 100));
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    // outside hexagon
    ctx.beginPath();
    ctx.moveTo(this.scale * 225, this.scale * 50);
    ctx.lineTo(this.scale * 398.2, this.scale * 150);
    ctx.lineTo(this.scale * 398.2, this.scale * 350);
    ctx.lineTo(this.scale * 225, this.scale * 450);
    ctx.lineTo(this.scale * 51.8, this.scale * 350);
    ctx.lineTo(this.scale * 51.8, this.scale * 150);
    ctx.closePath();
    ctx.stroke();
    // inside hexagon
    ctx.beginPath();
    ctx.moveTo(this.scale * 225, this.scale * 150);
    ctx.lineTo(this.scale * 311.6, this.scale * 200);
    ctx.lineTo(this.scale * 311.6, this.scale * 300);
    ctx.lineTo(this.scale * 225, this.scale * 350);
    ctx.lineTo(this.scale * 138.4, this.scale * 300);
    ctx.lineTo(this.scale * 138.4, this.scale * 200);
    ctx.closePath();
    ctx.stroke();
    // lines inside
    ctx.lineWidth = this.scale * 1.5;
    ctx.moveTo(this.scale * 225, this.scale * 250);
    ctx.lineTo(this.scale * (225 + this.playerStats.clay_out * 173.2), this.scale * (250 - this.playerStats.clay_out * 100));
    ctx.moveTo(this.scale * 225, this.scale * 250);
    ctx.lineTo(this.scale * (225 + this.playerStats.clay_in * 173.2), this.scale * (250 + this.playerStats.clay_in * 100));
    ctx.moveTo(this.scale * 225, this.scale * 250);
    ctx.lineTo(this.scale * 225, this.scale * (250 + this.playerStats.grass_in * 100));
    ctx.moveTo(this.scale * 225, this.scale * 250);
    ctx.lineTo(this.scale * (225 - this.playerStats.hard_in * 173.2), this.scale * (250 + this.playerStats.hard_in * 100));
    ctx.moveTo(this.scale * 225, this.scale * 250);
    ctx.lineTo(this.scale * (225 - this.playerStats.hard_out * 173.2), this.scale * (250 - this.playerStats.hard_out * 100));
    ctx.moveTo(this.scale * 225, this.scale * 250);
    ctx.lineTo(this.scale * 225, this.scale * (250 - this.playerStats.grass_out * 200));
    ctx.stroke();
    // text
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    const font = this.scale * 24;
    ctx.font = font + 'px serif';

    ctx.moveTo(this.scale * 225, this.scale * 50);
    ctx.lineTo(this.scale * 398.2, this.scale * 150);
    ctx.lineTo(this.scale * 398.2, this.scale * 350);
    ctx.lineTo(this.scale * 225, this.scale * 450);
    ctx.lineTo(this.scale * 51.8, this.scale * 350);
    ctx.lineTo(this.scale * 51.8, this.scale * 150);

    ctx.fillText('GO', this.scale * 225, this.scale * 40);
    ctx.fillText('CO', this.scale * 420, this.scale * 155);
    ctx.fillText('CI', this.scale * 415, this.scale * 365);
    ctx.fillText('GI', this.scale * 225, this.scale * 475);
    ctx.fillText('HI', this.scale * 30, this.scale * 365);
    ctx.fillText('HO', this.scale * 30, this.scale * 155);
  }

}
