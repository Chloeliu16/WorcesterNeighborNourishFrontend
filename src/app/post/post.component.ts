import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  accountId!: string;
  accountType!: string;
  postResponse: any;
  error!: string;
  success: boolean = false;

  // For Restaurant
  foodname!: string;
  foodtype!: string;
  foodingredients!: string;
  foodamount!: number;
  postedFoods!: any;
  ordersResponse!: any;
  // For Restaurant Add Supplier
  suppliername!: string;
  suppliertype!: string;
  supplierphone!: string;
  supplieremail!: string;
  suppliercertificate!: string;
  supplierError!: string;
  supplierSuccess: boolean = false;
  showAddSupplier: boolean = false;
  // For Organization
  activityname!: string;
  address!: string;
  starttime!: string;
  endtime!: string;
  contactname!: string;
  contactphone!: string;
  contactemail!: string;
  postedActivities!: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const aI = this.route.snapshot.paramMap.get('accountId');
    if (aI) {
      this.accountId = aI;
    }
    const aT = this.route.snapshot.paramMap.get('accountType');
    if (aT) {
      this.accountType = aT;
    }
    if (this.accountType == "restaurant") {
      this.sendViewFoodRequest();
      this.sendViewOrderRequest();
    } else if (this.accountType == "organization") {
      this.sendViewActivityRequest();
    }
  }
  selectedFoodType: string = ' ';

  onTypeChange() {
    this.foodtype = this.selectedFoodType;
    console.log('Selected type:', this.foodtype);
  }

  selectedFood: string = ' ';

  onFoodSubmit() {
    this.success = false;
    if (!this.foodname) {
      this.error = 'Empty food name!';
      return;
    }
    if (!this.foodtype) {
      this.error = 'Empty food type!';
      return;
    }
    if (!this.foodamount) {
      this.error = 'Empty food amount!';
      return;
    }

    let postData = {
      restUsername: this.accountId,
      foodName: this.foodname,
      foodType: this.foodtype,
      foodIngredients: this.foodingredients,
      amount: this.foodamount
    };
    // valid input.
    this.error = '';

    // send post request to backend
    this.http.post<any>('http://localhost:8080/postfood', postData).subscribe(
      (response) => {
        this.postResponse = response;
        if (!this.postResponse.success) {
          this.error = this.postResponse.failureReason;
        }
        this.success = this.postResponse.success;
        this.sendViewFoodRequest();
      },
      (error) => {
        this.error = error.message;
        this.success = this.postResponse.success;
        console.error(error);
        return;
      }
    );
  }

  onSupplierSubmit() {
    this.supplierSuccess = false;
    if (!this.suppliername) {
      this.supplierError = 'Empty Supplier Name!';
      return;
    }
    if (!this.suppliertype) {
      this.supplierError = 'Empty Supplier Type!';
    }
    if (!this.supplieremail) {
      this.supplierError = 'Empty Supplier Email!';
    }
    if (!this.supplierphone) {
      this.supplierError = 'Empty Supplier Phone!';
    }
    if (!this.suppliercertificate) {
      this.supplierError = 'Empty Supplier Certificate!';
    }

    let postData = {
      restUsername: this.accountId,
      name: this.suppliername,
      phone: this.supplierphone,
      email: this.supplieremail,
      type: this.suppliertype,
      foodSafetyCertification: this.suppliercertificate
    }

    this.supplierError = '';

    this.http.post<any>('http://localhost:8080/supplier', postData).subscribe(
      (response) => {
        this.postResponse = response;
        if (!this.postResponse.success) {
          this.supplierError = this.postResponse.failureReason;
        }
        this.supplierSuccess = this.postResponse.success;
        this.sendViewActivityRequest();
      },
      (error) => {
        this.supplierError = error.message;
        this.supplierSuccess = this.postResponse.success;
        console.error(error);
        return;
      }
    );
  }

  onShowSupplier() {
    this.showAddSupplier = !this.showAddSupplier;
  }

  onActivitySubmit() {
    this.success = false;
    if (!this.activityname) {
      this.error = 'Empty activity name!';
      return;
    }
    if (!this.address) {
      this.error = 'Empty address!';
      return;
    }
    if (!this.starttime) {
      this.error = 'Empty start time!';
      return;
    }
    if (!this.endtime) {
      this.error = 'Empty end time!';
      return;
    }
    if (!this.contactname) {
      this.error = 'Empty contact name!';
      return;
    }
    if (!this.contactphone) {
      this.error = 'Empty contact phone!';
      return;
    }
    if (!this.contactemail) {
      this.error = 'Empty contact email!';
      return;
    }

    let postData = {
      activity: {
        orgUsername: this.accountId,
        orgName: "", // left empty
        activityName: this.activityname,
        address: this.address,
        startTime: this.starttime,
        endTime: this.endtime,
        contactName: this.contactname,
        contactPhone: this.contactphone,
        contactEmail: this.contactemail
      }
    };
    // valid input.
    this.error = '';

    // send post request to backend
    this.http.post<any>('http://localhost:8080/postactivity', postData).subscribe(
      (response) => {
        this.postResponse = response;
        if (!this.postResponse.success) {
          this.error = this.postResponse.failureReason;
        }
        this.success = this.postResponse.success;
        this.sendViewActivityRequest();
      },
      (error) => {
        this.error = error.message;
        this.success = this.postResponse.success;
        console.error(error);
        return;
      }
    );
  }

  sendViewFoodRequest() {
    let viewFoodRequest = {
      restUsername: this.accountId,
    }
    this.http.post<any>('http://localhost:8080/viewfood', viewFoodRequest).subscribe(
      (response) => {
        this.postedFoods = response;
      },
      (error) => {
        this.error = 'An error occurred while fetching data.';
        console.error(error);
      }
    );
  }

  sendViewOrderRequest() {
    let viewOrderRequest = {
      restUsername: this.accountId,
    }
    this.http.post<any>('http://localhost:8080/vieworder', viewOrderRequest).subscribe(
      (response) => {
        this.ordersResponse = response;
      },
      (error) => {
        this.error = 'An error occurred while fetching data.';
        console.error(error);
      }
    );
  }

  sendViewActivityRequest() {
    let viewActivityRequest = {
      orgUsername: this.accountId,
    }
    this.http.post<any>('http://localhost:8080/viewactivity', viewActivityRequest).subscribe(
      (response) => {
        this.postedActivities = response;
      },
      (error) => {
        this.error = 'An error occurred while fetching data.';
        console.error(error);
      }
    );
  }

  redirectToHome() {
    this.router.navigate(['home']);
  }
}
