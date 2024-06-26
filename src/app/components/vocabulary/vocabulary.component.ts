import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from "@angular/material/icon";
import {ApiService, CharacterDetailResponse, CharacterFlashcardResponse} from "../../services/api.service";
import {NgClass} from "@angular/common";
import { FlashcardDetailComponent } from '../flashcard-detail/flashcard-detail.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [MatCardModule, MatIcon, NgClass, FlashcardDetailComponent, TranslateModule],
  templateUrl: './vocabulary.component.html',
  styleUrl: './vocabulary.component.css'
})
export class VocabularyComponent implements OnInit{

  listCharacters: CharacterFlashcardResponse[];
  characterDetail: CharacterDetailResponse;
  skipList = [0,20,40,60,80,100,120,140];
  skipIndex = 0

  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
    this.getCardsInfo(this.skipIndex);

  }

  getCardsInfo(skip:number) {
    this.apiService.get20Characters(this.skipList[skip]).subscribe({
      next: (data: CharacterFlashcardResponse[]) => {
        this.listCharacters = data;
        console.log('lista de caracteres: ' ,this.listCharacters)

      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    })
  }

  nextCards(){
    if (this.skipIndex +1 < this.skipList.length){
      this.skipIndex++
    } else {
      this.skipIndex = 0
    }
    this.getCardsInfo(this.skipIndex);
  }

  prevCards(){
    if (this.skipIndex -1 > 0){
      this.skipIndex--
    } else {
      this.skipIndex = this.skipList.length-1
    }
    this.getCardsInfo(this.skipIndex);
  }

  showDetail(id: number){
    this.apiService.getCharacterDetail(id).subscribe({
      next: (data: CharacterDetailResponse) => {
        this.characterDetail = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    })

    let modal = document.getElementById("modal");
    if (modal){
      modal.classList.remove("oculto")
    }
    let fondo = document.getElementById("fondo");
    if (fondo){
      fondo.classList.remove("oculto")
    }
  }


}
