import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tournament } from './tournament';


@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  tournaments: Tournament[];

  apiPath = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {
  }

  createHeader() {
    const headerOptions = new HttpHeaders();
    headerOptions.append('Access-Control-Allow-Headers', 'Content-Type');
    headerOptions.append('Access-Control-Allow-Methods', 'GET');
    headerOptions.append('Access-Control-Allow-Origin', '*');
    return headerOptions;
  }

  getAllTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.apiPath + 'tournaments', { headers: this.createHeader() });
  }

}
