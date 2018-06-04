import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { ReportsComponent } from './reports/reports.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';

import { HttpClientModule } from '@angular/common/http';
import { PlayersService } from './players.service';
import { DravHexagonComponent } from './drav-hexagon/drav-hexagon.component';
import { ExportToPdfComponent } from './export-to-pdf/export-to-pdf.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'players',
    component: PlayersComponent
  },
  {
    path: 'player/:id',
    component: PlayerDetailsComponent
  },
  {
    path: 'tournaments',
    component: TournamentsComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    PlayersComponent,
    TournamentsComponent,
    ReportsComponent,
    PageNotFoundComponent,
    PlayerDetailsComponent,
    DravHexagonComponent,
    ExportToPdfComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
  providers: [
    PlayersService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
