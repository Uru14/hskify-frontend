import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ApiService, CharacterDetailResponse} from "../../services/api.service";
import {Router} from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: '../../form.css'
})
export class RegisterComponent {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errorMessage: string;

  constructor(private apiService: ApiService, private router: Router) {}

  register() {
    if (this.password != this.confirmPassword) {
      console.log("contraseña incorrecta")
      return;
    }

    this.apiService.register(this.email, this.password, this.name).subscribe({

        next: (response) => {
          this.apiService.setToken(response.access_token);
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
        console.error('There was an error!', error);
        if (error.status === 400) {
          alert("Email already registered. Please use a different email.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      },
        complete: () => {
          console.log('Request complete');
        }
      }
    )
  }

}
