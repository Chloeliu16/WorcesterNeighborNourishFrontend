import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {
  userId!: string;
  foodName!: string;
  restUsername!: string;
  amount!: number;
  error: string = '';
  reserveResponse: any;
  reservedAmount!: number;
  success: boolean = false;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.extractRouteParam('userId');
    this.foodName = this.extractRouteParam('foodName');
    this.restUsername = this.extractRouteParam('restUsername');
    this.amount = this.extractRouteParam('amount', true);
  }

  extractRouteParam(paramName: string, convertToNumber: boolean = false): any {
    const paramValue = this.route.snapshot.paramMap.get(paramName);
    if (paramValue !== null && paramValue !== undefined) {
      return convertToNumber ? Number(paramValue) : paramValue;
    }
    return null;
  }

  onSubmit() {
    this.success = false;
    if (!this.userId) {
      this.error = 'Empty user id!';
      return;
    }
    if (!this.foodName) {
      this.error = 'Empty food name!';
      return;
    }
    if (!this.restUsername) {
      this.error = 'Empty restaruant username!';
      return;
    }
    if (!this.amount) {
      this.error = 'Empty amount!';
      return;
    }
    if (!this.reservedAmount) {
      this.error = 'Empty reserved amount!';
    }

    let reserveData = {
      restUsername: this.restUsername,
      cusUsername: this.userId,
      foodName: this.foodName,
      amount: this.reservedAmount,
    };
    // valid input.
    this.error = '';
    // send reserve request to backend
    this.http.post<any>('http://localhost:8080/reserve', reserveData).subscribe(
      (response) => {
        this.reserveResponse = response;
        if (!this.reserveResponse.success) {
          this.error = this.reserveResponse.failureReason;
        }
        this.success = this.reserveResponse.success;
      },
      (error) => {
        this.error = error.message;
        this.success = this.reserveResponse.success;
        console.error(error);
      }
    );
  }
}
