import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  type: string = '';
  email !: string;
  name !: string;
  detail !: string;

  contactResponse: any;
  error: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  selectedType: string = ' ';

  onTypeChange() {
    this.type = this.selectedType;
    console.log('Selected type:', this.type);
  }

  onSubmit() {
    if (!this.type) {
      this.error = 'type!';
      return;
    }

    if (!this.email) {
      this.error = 'Empty email!';
      return;
    }

    if (!this.name) {
      this.error = 'Empty name!';
      return;
    }

    if (!this.detail) {
      this.error = 'Empty detail!';
      return;
    }


    let contactData = {
      type: this.type,
      email: this.email,
      name: this.name,
      detail: this.detail
    };

    // valid input.
    this.error = '';

    // send login request to backend
    this.http.post<any>('http://localhost:8080/contactus', contactData).subscribe(
      (response) => {
        this.contactResponse = response;
        if (!this.contactResponse.success) {
          this.error = this.contactResponse.failureReason;
        } else {
          this.router.navigate(['/thankdonation']);
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

