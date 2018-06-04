import { Component, OnInit } from '@angular/core';
import { TournamentsService } from './../tournaments.service';
import { Tournament } from '../tournament';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  tournaments: Tournament[];
  displayedColumns = ['tournamentName', 'location', 'placement', 'surface', 'winnerName'];

  constructor(private tournamentsService: TournamentsService) { }

  ngOnInit() {
    this.tournamentsService.getAllTournaments().subscribe(allTournaments => {
      console.log(allTournaments);
      this.tournaments = allTournaments;
    });
  }

}
