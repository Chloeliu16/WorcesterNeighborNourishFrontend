import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {
  responseData: any;
  error!: string;
  faqs: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.viewFAQs();
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  viewFAQs() {
    this.http.get<any>('http://localhost:8080/faqs').subscribe(
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

