import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  responseData: any;
  error!: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.sendViewMaintenanceRequest();
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  sendViewMaintenanceRequest() {
    this.http.get<any>('http://localhost:8080/viewmaintenance').subscribe(
      (response) => {
        this.responseData = response;
      },
      (error) => {
        this.error = 'An error occurred while fetching data.';
        console.error(error);
      }
    );
  }
}
