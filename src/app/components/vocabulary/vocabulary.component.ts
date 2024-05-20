import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from "@angular/material/icon";
import {ApiService, CharacterDetailResponse, CharacterFlashcardResponse} from "../../services/api.service";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [MatCardModule, MatIcon],
  templateUrl: './vocabulary.component.html',
  styleUrl: './vocabulary.component.css'
})
export class VocabularyComponent {
  listCharacters: CharacterFlashcardResponse[] | undefined;
  characterDetail: CharacterDetailResponse | undefined;
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
        this.updateModal();
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    })

  }

  updateModal(){
    let modal = document.getElementById("modal");
    if (modal){
      modal.classList.add("card-modal")
    }
    let fondo = document.getElementById("fondo");
    if (fondo){
      fondo.classList.remove("oculto")
    }
    if (this.characterDetail) {
      let hanzi = document.getElementById("modal-hanzi");
      if (hanzi) {
        hanzi.innerText = this.characterDetail.hanzi;
      }

      let pinyin = document.getElementById("modal-pinyin");
      if (pinyin) {
        pinyin.innerText = this.characterDetail.pinyin;
      }

      let strokes = document.getElementById("modal-strokes");
      if (strokes) {
        strokes.innerText = this.characterDetail.stroke_count.toString();
      }

      let translation = document.getElementById("modal-translation");
      if (translation) {
        console.log("la translation es: ", this.characterDetail.translation)
        translation.innerText = this.characterDetail.translation.split(',')[0].toUpperCase();
      }

      let sentences = document.getElementById("modal-frase");
      if (sentences) {
        sentences.innerText = this.characterDetail.example_sentences[0].sentence;
      }
    }
  }
}
