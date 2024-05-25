import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {VocabularyComponent} from "./components/vocabulary/vocabulary.component";
import {FlashcardDetailComponent} from "./components/flashcard-detail/flashcard-detail.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'vocabulary', component: VocabularyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];
