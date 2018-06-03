import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-drav-hexagon',
  templateUrl: './drav-hexagon.component.html',
  styleUrls: ['./drav-hexagon.component.css']
})
export class DravHexagonComponent implements OnInit {

  @Input()
  playerStats: number[];

  @ViewChild('myCanvas') canvasRef: ElementRef;

  constructor() { }

  ngOnInit() {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    // outside hexagon
    ctx.fillStyle = '#7986cb'; // sets the color to fill in the rectangle with
    ctx.strokeStyle = '#303f9f'; // sets the color to fill in the rectangle with
    ctx.lineWidth = 3;
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
  }
}
