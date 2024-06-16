import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { ApiService, UserResponse } from "../../services/api.service";
import {DatePipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DatePipe,
    TranslateModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user_info: UserResponse;

  constructor(private apiService: ApiService, private router: Router) {
  }
  ngOnInit() {
    this.apiService.getUserLogged().subscribe({
      next: (response: UserResponse) => {

        this.user_info = response;
        console.log(this.user_info)
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Word marked as favorite');
      }
    })
  }

  logout() {
    this.apiService.deleteToken();
    this.router.navigate(['/login']);
  }


}
