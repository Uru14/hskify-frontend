import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {VocabularyComponent} from "./components/vocabulary/vocabulary.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {MemoryGameComponent} from "./components/games/memory-game/memory-game.component";
import { GrammarComponent } from './components/grammar/grammar.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'vocabulary', component: VocabularyComponent},
  {path: 'grammar', component: GrammarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'memory-game', component: MemoryGameComponent},

];
