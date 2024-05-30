import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import "/node_modules/flag-icons/css/flag-icons.min.css";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatIcon,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private languageService: LanguageService){

  }

  switchLanguage(language: string) {
    this.languageService.switchLanguage(language);
  }
}
