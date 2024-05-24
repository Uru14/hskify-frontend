import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {CharacterDetailResponse} from "../../services/api.service";

@Component({
  selector: 'app-flashcard-detail',
  standalone: true,
  imports: [MatCardModule, MatIcon, NgClass],
  templateUrl: './flashcard-detail.component.html',
  styleUrl: './flashcard-detail.component.css'
})
export class FlashcardDetailComponent {
  @Input() charDetail!: CharacterDetailResponse | undefined;
  
  isFavorite = false;

  ngOnChanges() {
    console.log('Character Detail:', this.charDetail);
  }

  addFav(id:number | undefined) {
    console.log(id);
    this.isFavorite = !this.isFavorite;

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
