import {Component, OnInit} from '@angular/core';
import {
  ApiService,
  Achievement,
} from "../../services/api.service";
import {TranslateModule} from "@ngx-translate/core";
@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})
export class AchievementsComponent implements OnInit{

  achievements:Achievement[];
  total_achievements = [0, 1, 2, 3, 4, 5]

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.apiService.getUserAchievement().subscribe({
      next: (response: Achievement[]) => {
        this.achievements = response;
        console.log("respuesta: ", this.achievements)
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Word marked as favorite');
      }
    })
  }


}
