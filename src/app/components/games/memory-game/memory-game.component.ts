import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService, CharacterFlashcardResponse} from "../../../services/api.service";

interface Item {
  name: string;
  image: string;
}

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
  //wrapperWidth: string = '26.87em';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.moves = document.getElementById("moves-count")!;
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
    return cardValues;
  }

  matrixGenerator(cardValues: CharacterFlashcardResponse[], size: number = this.gameMode): void {
    this.gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
      this.gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${cardValues[i].id}">
        <div class="card-before">?</div>
        <div class="card-after">
          <p class="image">${cardValues[i].hanzi}</p>
        </div>
      </div>`;
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
    this.moves.innerHTML = `<span>Moves:</span> ${this.movesCount}`;
    this.interval = setInterval(() => this.timeGenerator(), 1000);
    this.initializer();
  }

  stopGame(): void {
    this.controls.classList.remove("hide");
    this.stopButton.classList.add("hide");
    this.startButton.classList.remove("hide");
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
      //this.wrapperWidth = '26.87em';
    } else if (option.id == 'medium') {
      this.gameMode = 6;
      //this.wrapperWidth = '40.5em';
    } else {
      this.gameMode = 8;
      //this.wrapperWidth = '54.13em';
    }
    
  }
}
