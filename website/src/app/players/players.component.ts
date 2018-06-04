import { Component, OnInit, ViewChild } from '@angular/core';

import { PlayersService } from '../players.service';
import { Player } from '../player';

import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];
  pages: number;
  currentPage: number;
  playersPerPage: number;
  displayedColumns = ['name', 'age', 'points', 'player_key'];

  constructor(private playersService: PlayersService) {
  }

  ngOnInit() {
    this.playersService.getAllPlayers().subscribe(allPlayers => {
      this.players = allPlayers;
    });
    this.currentPage = this.playersService.searchSetting.whichPage;
    this.playersPerPage = this.playersService.searchSetting.playersPerPage;
  }


  applyFilter(filterValue: string) {
    console.log(filterValue);
  }
  /*
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }
  */
}
