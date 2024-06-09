import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {VocabularyComponent} from "./components/vocabulary/vocabulary.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {MemoryGameComponent} from "./components/games/memory-game/memory-game.component";
import { GrammarComponent } from './components/grammar/grammar.component';
import { authGuard } from './auth.guard';
import {ProfileComponent} from "./components/profile/profile.component";
import {LearnedWordsComponent} from "./components/learned-words/learned-words.component";
import {AchievementsComponent} from "./components/achievements/achievements.component";
import {LeaderboardComponent} from "./components/leaderboard/leaderboard.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'vocabulary', component: VocabularyComponent, canActivate: [authGuard] },
  {path: 'grammar', component: GrammarComponent, canActivate: [authGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'memory-game', component: MemoryGameComponent, canActivate: [authGuard] },
  {path: 'profile', component: ProfileComponent, children: [
      { path: 'learned-words', component: LearnedWordsComponent },
      { path: 'achievements', component: AchievementsComponent },
      { path: 'leaderboard', component: LeaderboardComponent },
      { path: '', redirectTo: 'learned-words', pathMatch: 'full' }
    ] ,canActivate: [authGuard] },

];
