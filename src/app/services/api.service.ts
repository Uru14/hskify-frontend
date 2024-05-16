import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface HanziSimpleResponse {
  hanzi: string;
  pinyin: string;
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
}
