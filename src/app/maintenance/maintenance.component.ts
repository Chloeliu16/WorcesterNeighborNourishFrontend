import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css'
})
export class MaintenanceComponent {
  responseData: any;
  error!: string;
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.sendViewMaintenanceRequest();
  }

  redirectToHome() {
    this.router.navigate(['/home']);
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
