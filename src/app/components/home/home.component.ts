import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService, HanziSimpleResponse } from '../../services/api.service';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

@Injectable()
export class HomeComponent {

  wordOfDay: HanziSimpleResponse  | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getWordOfDay();

  }

  getWordOfDay() {
    this.apiService.getWordOfDay().subscribe({
      next: (data: HanziSimpleResponse) => {
        this.wordOfDay = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

}
