import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ApiService, HanziSimpleResponse } from '../../services/api.service';
import {RouterLink} from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';

@Component({ selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterLink, TranslateModule],
   })

@Injectable()
export class HomeComponent implements OnInit {

  wordOfDay: HanziSimpleResponse;

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
