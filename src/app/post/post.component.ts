import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  accountId!: string;
  accountType!: string;
  foodname!: string;
  foodtype!: string;
  foodingredients!: string;
  foodamount!: number;
  postResponse: any;
  error!: string;
  success: boolean = false;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const aI = this.route.snapshot.paramMap.get('accountId');
    if (aI) {
      this.accountId = aI;
    }
    const aT = this.route.snapshot.paramMap.get('accountType');
    if (aT) {
      this.accountType = aT;
    }
  }

  onSubmit() {
    this.success = false;
    if (!this.foodname) {
      this.error = 'Empty foodname!';
      return;
    }
    if (!this.foodamount) {
      this.error = 'Empty foodamount!';
      return;
    }

    let postData = {
      supplierUsername: this.accountId,
      supplierType: 0,
      foodName: this.foodname,
      foodType: this.foodtype,
      foodIngredients: this.foodingredients,
      amount: this.foodamount
    };
    if (this.accountType === 'restaurant') {
      postData.supplierType = 1;
    } else if (this.accountType === 'organization') {
      postData.supplierType = 2;
    } else {
      this.error = 'Wrong account type!';
      return;
    }
    // valid input.
    this.error = '';

    // send login request to backend
    this.http.post<any>('http://localhost:8080/post', postData).subscribe(
      (response) => {
        this.postResponse = response;
        if (!this.postResponse.success) {
          this.error = this.postResponse.failureReason;
        }
        this.success = this.postResponse.success;
      },
      (error) => {
        this.error = error.message;
        this.success = this.postResponse.success;
        console.error(error);
        return;
      }
    );
  }

}
