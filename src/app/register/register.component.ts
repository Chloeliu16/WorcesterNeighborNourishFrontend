import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username!: string;
  name!: string;
  password!: string;
  email!: string;
  phone!: string;
  address!: string;
  certificate!: string;
  selectedAccountType!: string;
  registerResponse: any;
  error: string = '';
  constructor(private http: HttpClient, private router: Router) { }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (!this.username) {
      this.error = 'Empty username!';
      return;
    }
    if (!this.name) {
      this.error = 'Empty name!';
      return;
    }
    if (!this.password) {
      this.error = 'Empty password!';
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
    if ((this.selectedAccountType == 'restaurant' || this.selectedAccountType == 'organization') && !this.address) {
      this.error = 'Empty address!';
      return;
    }
    if (this.selectedAccountType == 'restaurant' && !this.certificate) {
      this.error = 'Empty certificate!';
      return;
    }
    let registerData = {
      username: this.username,
      password: this.password,
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      certificate: this.certificate,
      accountType: 0
    };
    if (this.selectedAccountType === 'customer') {
      registerData.accountType = 1;
    } else if (this.selectedAccountType === 'restaurant') {
      registerData.accountType = 2;
    } else if (this.selectedAccountType === 'organization') {
      registerData.accountType = 3;
    } else {
      this.error = 'No account type selected!';
      return;
    }
    // valid input.
    this.error = '';

    // send login request to backend
    this.http.post<any>('http://localhost:8080/register', registerData).subscribe(
      (response) => {
        this.registerResponse = response;
        if (!this.registerResponse.success) {
          this.error = this.registerResponse.failureReason;
        } else {
          this.router.navigate(['/login']);
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
