import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankjoinus',
  templateUrl: './thankjoinus.component.html',
  styleUrl: './thankjoinus.component.css'
})
export class ThankjoinusComponent {
  registerResponse: any;
  error: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

}
