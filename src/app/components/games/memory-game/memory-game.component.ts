import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService, CharacterFlashcardResponse} from "../../../services/api.service";



@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [],
  templateUrl: './memory-game.component.html',
  styleUrl: './memory-game.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MemoryGameComponent implements OnInit {
  movesCount: number = 0;
  winCount: number = 0;
  seconds: number = 0;
  minutes: number = 0;
  moves: HTMLElement;
  wrapper: HTMLElement;
  timeValue: HTMLElement;
  startButton: HTMLElement;
  stopButton: HTMLElement;
  gameContainer: Element;
  result: HTMLElement;
  controls: Element;
  cards: NodeListOf<Element>;
  firstCard: Element | false = false;
  secondCard: Element | false = false;
  firstCardValue: string = '';
  interval: any;
  items: CharacterFlashcardResponse[] = [];
  gameMode: number;
  selectedButton: HTMLElement | null = null;
  selectedButton2: HTMLElement | null = null;
  difficulty: string = 'easy';
  timeScoreBase: number = 100;
  moveScoreBase: number = 10; 
  totalScore: number = 0;
  cardValue1: 'hanzi' | 'pinyin' | 'translation' = 'hanzi';
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.moves = document.getElementById("moves-count")!;
    this.wrapper = document.getElementById("wrapper")!;
    this.timeValue = document.getElementById("time")!;
    this.startButton = document.getElementById("start")!;
    this.stopButton = document.getElementById("stop")!;
    this.gameContainer = document.querySelector(".game-container")!;
    this.result = document.getElementById("result")!;
    this.controls = document.querySelector(".controls-container")!;
    this.startButton.addEventListener("click", () => this.startGame());
    this.stopButton.addEventListener("click", () => this.stopGame());

    this.apiService.getAllCharacters().subscribe({
      next: (data: CharacterFlashcardResponse[]) => {
        for (let char of data) {
          this.items.push(char)
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    })

    
  }

  timeGenerator(): void {
    this.seconds += 1;
    if (this.seconds >= 60) {
      this.minutes += 1;
      this.seconds = 0;
    }
    let secondsValue = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
    let minutesValue = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
    this.timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
  }

  movesCounter(): void {
    this.movesCount += 1;
    this.moves.innerHTML = `<span>Moves:</span>${this.movesCount}`;
  }

  generateRandom(size: number = this.gameMode): CharacterFlashcardResponse[] {
    let tempArray = [...this.items];
    let cardValues: CharacterFlashcardResponse[] = [];
    size = (size * size) / 2;
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      tempArray.splice(randomIndex, 1);
    }
    console.log(cardValues)
    return cardValues;
  }

  matrixGenerator(cardValues: CharacterFlashcardResponse[], size: number = this.gameMode): void {
    this.gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    let isHanzi = true;

    for (let i = 0; i < size * size; i++) {
      const randomIndex = Math.floor(Math.random() * cardValues.length);
      const card = cardValues[randomIndex];
  
      let cardContent: string;
      if (isHanzi) {
        cardContent = card.hanzi;
      } else {
        if (this.cardValue1 === 'translation') {
          const translations = card.translation.split(',');
          cardContent = translations.length > 0 ? translations[0].trim() : '';
        } else {
          cardContent = card[this.cardValue1];
        }
      }
  
      this.gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${card.id}">
        <div class="card-before">?</div>
        <div class="card-after">
          <p class="image">${cardContent}</p>
        </div>
      </div>`;
  
      cardValues.splice(randomIndex, 1); // Remover la carta seleccionada para evitar repeticiones
      isHanzi = !isHanzi;
    }
    (this.gameContainer as HTMLElement).style.gridTemplateColumns = `repeat(${size},auto)`;
    this.cards = document.querySelectorAll(".card-container");
    this.cards.forEach((card) => {
      card.addEventListener("click", () => {
        if (!card.classList.contains("matched")) {
          card.classList.add("flipped");
          if (!this.firstCard) {
            this.firstCard = card;
            this.firstCardValue = card.getAttribute("data-card-value")!;
          } else {
            this.movesCounter();
            this.secondCard = card;
            let secondCardValue = card.getAttribute("data-card-value")!;
            if (this.firstCardValue == secondCardValue) {
              this.firstCard!.classList.add("matched");
              this.secondCard.classList.add("matched");
              this.firstCard = false;
              this.winCount += 1;
              if (this.winCount == Math.floor(cardValues.length / 2)) {
                this.result.innerHTML = `<h2>You Won</h2><h4>Moves: ${this.movesCount}</h4>`;
                this.stopGame();
                this.calculateScore();
              }
            } else {
              let [tempFirst, tempSecond] = [this.firstCard, this.secondCard];
              this.firstCard = false;
              this.secondCard = false;
              let delay = setTimeout(() => {
                tempFirst!.classList.remove("flipped");
                tempSecond!.classList.remove("flipped");
              }, 900);
            }
          }
        }
      });
    });
  }

  startGame(): void {
    
    this.movesCount = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.controls.classList.add("hide");
    this.stopButton.classList.remove("hide");
    this.startButton.classList.add("hide");
    this.wrapper.classList.remove("hide");
    this.moves.innerHTML = `<span>Moves:</span> ${this.movesCount}`;
    this.interval = setInterval(() => this.timeGenerator(), 1000);
    this.initializer();
  }

  stopGame(): void {
    this.controls.classList.remove("hide");
    this.stopButton.classList.add("hide");
    this.startButton.classList.remove("hide");
    this.wrapper.classList.add("hide");
    clearInterval(this.interval);
  }

  initializer(): void {
    this.result.innerText = "";
    this.winCount = 0;
    let cardValues = this.generateRandom();
    this.matrixGenerator(cardValues);
  }

  selectMode(event: Event) {
    const option = event.target as HTMLElement;

    if (this.selectedButton) {
      this.selectedButton.classList.remove('selected');
    }

    option.classList.add('selected');
    this.selectedButton = option;
    
    if (option.id == 'easy'){
      this.gameMode = 4;
      this.difficulty = 'easy'; 
    } else if (option.id == 'medium') {
      this.gameMode = 6;
      this.difficulty = 'medium'; 
    } else {
      this.gameMode = 8;
      this.difficulty = 'hard';
    }
    
  }

  selectMode2(event: Event) {
    const option = event.target as HTMLElement;

    if (this.selectedButton2) {
      this.selectedButton2.classList.remove('selected');
    }

    option.classList.add('selected');
    this.selectedButton2 = option;
    
    switch (option.id) {
      case 'hanzi-hanzi':
          this.cardValue1 = 'hanzi';
          break;
      case 'hanzi-pinyin':
          this.cardValue1 = 'pinyin';
          break;
      case 'hanzi-trans':
          this.cardValue1 = 'translation';
          break;
  }
    
  }

  calculateScore(): void {
    
    const timeScore = Math.max(0, this.timeScoreBase - (this.minutes * 60 + this.seconds)); 

    const moveScore = this.moveScoreBase * this.movesCount;

    this.totalScore = Math.max(0, 1000 - (timeScore + moveScore));
    console.log(`Tu puntuación total es: ${this.totalScore}`); 

    const scoreElement = document.getElementById("score");
    if (scoreElement) {
      scoreElement.innerHTML = `<span>Score:</span> ${this.totalScore}`;
    }
  }
}
