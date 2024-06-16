import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {
  ApiService,
  CharacterDetailResponse,
} from "../../services/api.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-learned-words',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule
  ],
  templateUrl: './learned-words.component.html',
  styleUrl: './learned-words.component.css'
})
export class LearnedWordsComponent  implements OnInit  {

  favWords: CharacterDetailResponse[];
  constructor(private apiService: ApiService) {

  }


  ngOnInit() {
    this.apiService.getUserFavorites().subscribe({
      next: (response: CharacterDetailResponse[]) => {

        this.favWords = response;
        console.log("respuestaaa: ", this.favWords)
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Word marked as favorite');
      }
    })
  }

  getStrokeColor(strokeCount: number): string {
    console.log("strokeCount: ", strokeCount)
    if (strokeCount <= 5) {
      return 'green';
    } else if (strokeCount <= 10) {
      return 'blue';
    } else if (strokeCount <= 17) {
      return 'GoldenRod';
    } else {
      return 'red';
    }

  }

  protected readonly parseInt = parseInt;


  truncateDefinition(definition: string): string {
    if (definition.length <= 30) {
      return definition;
    }

    const parts = definition.split(',');
    return parts.slice(0, 3).join(',') + (parts.length > 3 ? '...' : '');
  }
}
