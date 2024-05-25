import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, skip} from 'rxjs';
import {CookieService} from "ngx-cookie-service";

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
  translation: string;
}

export interface CharacterDetailResponse {
  id: number;
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

  constructor(private http: HttpClient, private cookies: CookieService) { }

  register(email: string, password: string,  name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/`, { email, password, name});
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return this.http.post<any>(`${this.apiUrl}/token`, body, { headers });
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }




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

  /*addFavorite(charId:number, userId:number)*/
}
