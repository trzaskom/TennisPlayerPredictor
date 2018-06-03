import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

  constructor(private http: HttpClient) { }

  getPlayer() {
    const headerOptions = new HttpHeaders();
    headerOptions.append('Access-Control-Allow-Headers', 'Content-Type');
    headerOptions.append('Access-Control-Allow-Methods', 'GET');
    headerOptions.append('Access-Control-Allow-Origin', '*');
    return this.http.get('http://localhost:3000/api/players/f324', { headers: headerOptions });
  }
}
