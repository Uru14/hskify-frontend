import {Component, OnInit} from '@angular/core';
import {ApiService, LeaderBoardScores} from "../../services/api.service";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule
  ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit{

  scoreInfo: LeaderBoardScores[];
  filteredLeaderboard: LeaderBoardScores[];
  selectedParameter: string = 'all';

  constructor(private apiService: ApiService) {

  }


  ngOnInit() {
    this.apiService.getUsersScores().subscribe({
      next: (response: LeaderBoardScores[]) => {

        this.scoreInfo = response;
        this.filteredLeaderboard = response;
        console.log("respuestaaa: ", this.scoreInfo)
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Word marked as favorite');
      }
    })
  }

  filterLeaderboard(): void {
    if (this.selectedParameter === 'all') {
      this.filteredLeaderboard = this.scoreInfo;
    } else {
      this.filteredLeaderboard = this.scoreInfo.filter(score =>
        score.parameters === this.selectedParameter);
    }
  }
}

