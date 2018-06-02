import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../players.service';
import { Player } from '../player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
    this.playersService.getAllPlayers().subscribe(
      (data) => this.players = data,
      (err) => console.error(err),
      () => console.log('Done loading players'));
    console.log(this.players);
  }

}
