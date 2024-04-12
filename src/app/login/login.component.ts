import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  selectedAccountType!: string;
  loginResponse: any;
  error: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Empty username or password!';
      return;
    }
    let loginData = { username: this.username, password: this.password, accountType: 0 };
    if (this.selectedAccountType === 'customer') {
      loginData.accountType = 1;
    } else if (this.selectedAccountType === 'restaurant') {
      loginData.accountType = 2;
    } else if (this.selectedAccountType === 'organization') {
      loginData.accountType = 3;
    } else {
      this.error = 'No account type selected!';
      return;
    }
    // valid input.
    this.error = '';

    // send login request to backend
    this.http.post<any>('http://localhost:8080/login', loginData).subscribe(
      (response) => {
        this.loginResponse = response;
        if (!this.loginResponse.success) {
          this.error = this.loginResponse.failureReason;
        } else if (this.selectedAccountType === 'customer') {
          this.router.navigate(['/view/' + this.username]);
        } else {
          this.router.navigate(['/post/' + this.selectedAccountType + '/' + this.username]);
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
