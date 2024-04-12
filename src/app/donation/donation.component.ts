import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent {
  donorType: string = '';
  name !: string;
  email !: string;
  phone !: string;
  typeOfDonatedFood !: string;
  quantityOfDonations !: string;
  other !: string;

  registerResponse: any;
  error: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  selectedDonorType: string = ' ';

  onDonorTypeChange() {
    this.donorType = this.selectedDonorType; // 将选中的值赋给 donorType 变量
    console.log('Selected donor type:', this.donorType);
    // 可以在这里添加处理选项变化的逻辑
  }

  onSubmit() {
    if (!this.donorType) {
      this.error = 'Empty Donor Type!';
      return;
    }
    if (!this.name) {
      this.error = 'Empty name!';
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

    if (!this.typeOfDonatedFood) {
      this.error = 'Empty Type of Donation Foods!';
      return;
    }

    if (!this.quantityOfDonations) {
      this.error = 'Empty Quantity of Donations!';
      return;
    }

    let donationData = {
      donorType: this.donorType,
      name: this.name,
      email: this.email,
      phone: this.phone,
      typeOfDonatedFood: this.typeOfDonatedFood,
      quantityOfDonations: this.quantityOfDonations,
      other: this.other
    };

    // valid input.
    this.error = '';

    // send login request to backend
    this.http.post<any>('http://localhost:8080/donation', donationData).subscribe(
      (response) => {
        this.registerResponse = response;
        if (!this.registerResponse.success) {
          this.error = this.registerResponse.failureReason;
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
