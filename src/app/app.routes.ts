import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {VocabularyComponent} from "./components/vocabulary/vocabulary.component";
import {FlashcardDetailComponent} from "./components/flashcard-detail/flashcard-detail.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'vocabulary', component: VocabularyComponent}
];
