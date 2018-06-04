import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from './player';
import { PlayerStats } from './player-stats';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  apiPath = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {
  }

  /*
  searchSetting = {
    whichPage: 0,
    playersPerPage: 10
  };
  */

  createHeader() {
    const headerOptions = new HttpHeaders();
    headerOptions.append('Access-Control-Allow-Headers', 'Content-Type');
    headerOptions.append('Access-Control-Allow-Methods', 'GET');
    headerOptions.append('Access-Control-Allow-Origin', '*');
    return headerOptions;
  }

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiPath + 'players', { headers: this.createHeader() });
  }

  getOnePlayer(id: string): Observable<Player> {
    return this.http.get<Player>(this.apiPath + 'player/' + id, { headers: this.createHeader() });
  }

  getPlayerStats(id: string): Observable<PlayerStats> {
    return this.http.get<PlayerStats>(this.apiPath + 'playerstats/' + id, { headers: this.createHeader() });
  }

}
