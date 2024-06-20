import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {ApiService, CharacterDetailResponse} from "../../services/api.service";

@Component({
  selector: 'app-flashcard-detail',
  standalone: true,
  imports: [MatCardModule, MatIcon, NgClass],
  templateUrl: './flashcard-detail.component.html',
  styleUrl: './flashcard-detail.component.css'
})
export class FlashcardDetailComponent {
  @Input() charDetail: CharacterDetailResponse;

  isFavorite: boolean;

  constructor(private apiService: ApiService) {
  }
  ngOnChanges() {
    if (this.charDetail){
      console.log('char ', this.charDetail.is_favorite)
      this.isFavorite = this.charDetail.is_favorite
      console.log(this.isFavorite)
    }
    console.log('Character Detail:', this.charDetail);
  }

  addFav(id:number) {
    console.log(id);
    this.isFavorite = !this.isFavorite;
    this.apiService.addFavorite(id).subscribe({
      next: (response) => {

        console.log('response: ',response)

      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Word marked as favorite');
      }
    })

    this.apiService.getFavCount().subscribe({
      next: (response) => {
        console.log('response: ',response)
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('completed');
      }
    })
  }

  closeDetail(){
    let modal = document.getElementById("modal");
    if (modal){
      modal.classList.add("oculto")
    }
    let fondo = document.getElementById("fondo");
    if (fondo){
      fondo.classList.add("oculto")
    }
  }
}



