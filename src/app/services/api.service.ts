import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, skip} from 'rxjs';

export interface HanziSimpleResponse {
  hanzi: string;
  pinyin: string;
}

export interface CharacterFlashcardResponse {
  id: number;
  hanzi: string;
  pinyin: string;
  translation: string;
}

export interface ExampleSentenceResponse {
  sentence: string;
  pintranslationyin: string;
}

export interface CharacterDetailResponse {
  hanzi: string;
  pinyin: string;
  translation: string;
  stroke_count: string;
  hsk_level: number;
  example_sentences: ExampleSentenceResponse[]
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getWordOfDay(): Observable<HanziSimpleResponse> {
    return this.http.get<HanziSimpleResponse>(`${this.apiUrl}/wordDay/`);
  }

  get20Characters(skip: number): Observable<CharacterFlashcardResponse[]> {
    let params = new HttpParams()
      .set('skip', skip.toString())
    return this.http.get<CharacterFlashcardResponse[]>(`${this.apiUrl}/characters/`, { params });
  }

  getCharacterDetail(id:number): Observable<CharacterDetailResponse> {
    return this.http.get<CharacterDetailResponse>(`${this.apiUrl}/characters/${id}`);
  }
}
