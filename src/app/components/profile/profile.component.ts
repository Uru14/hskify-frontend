import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { ApiService, UserResponse } from "../../services/api.service";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user_info: UserResponse;

  constructor(private apiService: ApiService) {
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

}
