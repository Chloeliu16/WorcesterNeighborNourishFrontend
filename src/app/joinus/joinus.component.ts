import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-joinus',
  templateUrl: './joinus.component.html',
  styleUrls: ['./joinus.component.css']
})
export class JoinusComponent {
  name !: string;
  age !: string;
  career !: string;
  email !: string;
  phone !: string;
  city !: string;
  zipcode !: string;
  availability !: string;

  registerResponse: any;
  error: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  redirectToThank() {
    this.router.navigate(['/thankjoinus']);
  }
  onSubmit() {
    if (!this.name) {
      this.error = 'Empty name!';
      return;
    }
    if (!this.age) {
      this.error = 'Empty age!';
      return;
    }
    if (!this.email) {
      this.error = 'Empty email!';
      return;
    }

    if (!this.phone) {
      this.error = 'Empty phone!';
      return;
    }

    if (!this.city) {
      this.error = 'Empty city!';
      return;
    }

    if (!this.zipcode) {
      this.error = 'Empty zipcode!';
      return;
    }

    if (!this.availability) {
      this.error = 'Empty availability!';
      return;
    }

    let volunteerData = {
      name: this.name,
      age: this.age,
      carrer: this.career,
      email: this.email,
      phone: this.phone,
      city: this.city,
      zipcode: this.zipcode,
      availability: this.availability
    };

    // valid input.
    this.error = '';

    // send login request to backend
    this.http.post<any>('http://localhost:8080/volunteer', volunteerData).subscribe(
      (response) => {
        this.registerResponse = response;
        if (!this.registerResponse.success) {
          this.error = this.registerResponse.failureReason;
        } else {
          this.router.navigate(['/thankjoinus']);
        }
      },
      (error) => {
        this.error = error.message;
        console.error(error);
        return;
      }
    );
  }
}