import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hskify-frontend';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const token = this.apiService.getToken();
    if (token) {
      this.apiService.getUserLogged().subscribe({
        next: (response) => {
          console.log('User is logged in:', response);
        },
        error: (error) => {
          console.error('User is not logged in', error);
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
