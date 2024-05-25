import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

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

  constructor() {
  }

  login(){
    console.log(this.email)
    console.log(this.password)
  }
}
