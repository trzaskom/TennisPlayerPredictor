import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayersService } from '../players.service';
import { Player } from '../player';
import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from 'ng-auto-complete';
import { PlayerStats } from '../player-stats';

@Component({
  selector: 'app-player-comparator',
  templateUrl: './player-comparator.component.html',
  styleUrls: ['./player-comparator.component.css']
})
export class PlayerComparatorComponent implements OnInit {

  public group;

  players: Player[];
  playerNames = [];

  firstPlayer: {name: string, id: string};
  firstPlayerStats: PlayerStats;
  secondPlayer: {name: string, id: string};
  secondPlayerStats: PlayerStats;

  conditions: string[] = ['Outdoor', 'Indoor'];
  surfaces = ['Hard', 'Grass', 'Clay'];

  condition: string;
  surface: string;

  playerChanceWin = [0, 0];
  notEnoughData = false;

  @ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
    this.playersService.getAllPlayers().subscribe(allPlayers => {
      this.players = allPlayers;

      allPlayers.forEach(player => {
        this.playerNames.push({ 'name': player.name, 'id': player.player_key });
      });
      console.log('--- playerNames ---');
      console.log(this.playerNames);
      this.group = [CreateNewAutocompleteGroup(
        'Search first player from list', 'completer',
        this.playerNames,
        { titleKey: 'name', childrenKey: null })];
    });
  }

  selectFirstPlayer(item: SelectedAutocompleteItem) {
    if (this.firstPlayerStats !== undefined) {
      this.firstPlayerStats = undefined;
    }
    console.log('firstPlayer: ' + item.item);
    this.firstPlayer = item.item.original;
    this.playersService.getPlayerStats(item.item.original.id).subscribe(onePlayerStats => {
      this.firstPlayerStats = onePlayerStats[0];
      console.log('--- firstPlayerStats ---');
      console.log(onePlayerStats[0]);
    });
  }

  selectSecondPlayer(item: SelectedAutocompleteItem) {
    if (this.secondPlayerStats !== undefined) {
      this.secondPlayerStats = undefined;
    }
    console.log('-- secondPlayer --');
    console.log(item.item.original);
    this.secondPlayer = item.item.original;
    this.playersService.getPlayerStats(item.item.original.id).subscribe(onePlayerStats => {
      this.secondPlayerStats = onePlayerStats[0];
      console.log('--- secondPlayerStats ---');
      console.log(onePlayerStats[0]);
    });
  }

  setSurface(surface: string) {
    console.log('surface = ' + surface);
    this.surface = surface;
  }

  setCondition(condition: string) {
    console.log('condition = ' + condition);
    this.condition = condition;
  }

  solveWinner() {
    if (this.condition !== undefined && this.surface !== undefined) {
      this.notEnoughData = false;
      const surface = this.surface.toLowerCase();
      console.log('surface:' + surface);
      let condition;
      if (this.condition === 'Outdoor') {
        condition = 'out';
        console.log('First:' + this.firstPlayerStats[surface + '_' + condition]);
        console.log('Second:' + this.secondPlayerStats[surface + '_' + condition]);
      } else if (this.condition === 'Indoor') {
        condition = 'in';
        console.log('First:' + this.firstPlayerStats[surface + '_' + condition]);
        console.log('Second:' + this.secondPlayerStats[surface + '_' + condition]);
      } else {
        console.log('ERROR: incorrect condition!');
      }
      if (this.firstPlayerStats[surface + '_' + condition] === 0 || this.secondPlayerStats[surface + '_' + condition] === 0) {
        this.notEnoughData = true;
      }
        this.playerChanceWin = this.calculatePercentages(
          this.firstPlayerStats[surface + '_' + condition], this.secondPlayerStats[surface + '_' + condition]
        );
    } else {
      console.log('ERROR: condition or surface is undefined!');
    }
  }

  calculatePercentages(firstPlayerSkill: number, secondPlayerSkill: number) {
    const sumSkill = firstPlayerSkill + secondPlayerSkill;
    const firstPlayerChance = firstPlayerSkill / sumSkill * 100;
    const secondPlayerChance = secondPlayerSkill / sumSkill * 100;
    return [firstPlayerChance, secondPlayerChance];
  }
}

