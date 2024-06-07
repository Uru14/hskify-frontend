import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {ApiService} from "./services/api.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hskify-frontend';

  constructor(private apiService: ApiService, private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  
}
