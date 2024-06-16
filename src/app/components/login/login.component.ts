import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: '../../form.css'
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private apiService: ApiService, private router: Router) {
  }

  login(){
    this.apiService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log("response: ", response)
        this.apiService.deleteToken();
        this.apiService.setToken(response.access_token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    })
  }
}
