import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankdonation',
  templateUrl: './thankdonation.component.html',
  styleUrls: ['./thankdonation.component.css']
})
export class ThankdonationComponent {
  registerResponse: any;
  error: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

}
