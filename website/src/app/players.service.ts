import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Player } from './player';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  apiPath = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {
  }

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiPath + 'players');
  }

  getOnePlayer(id: string): Observable<Player> {
    return this.http.get<Player>(this.apiPath + 'players/' + id);
  }
}
