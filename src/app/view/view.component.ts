import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  userId!: string;
  responseData: any;
  previousReservation: any;
  error!: string;
  // for Feedback
  type!: string;
  info!: string;
  success: boolean = false;
  feedbackResponse: any;
  feedbackerror!: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const tmp = this.route.snapshot.paramMap.get('userId');
    if (tmp) {
      this.userId = tmp;
    }
    this.sendViewRequest();
    this.sendViewOrderRequest();
  }

  sendViewRequest() {
    this.http.get<any>('http://localhost:8080/view').subscribe(
      (response) => {
        this.responseData = response;
      },
      (error) => {
        this.error = 'An error occurred while fetching data.';
        console.error(error);
      }
    );
  }

  sendViewOrderRequest() {
    let viewOrderRequest = {
      cusUsername: this.userId,
    }
    this.http.post<any>('http://localhost:8080/vieworder', viewOrderRequest).subscribe(
      (response) => {
        this.previousReservation = response;
      },
      (error) => {
        this.error = 'An error occurred while fetching data.';
        console.error(error);
      }
    );
  }

  onFeedbackSubmit() {
    this.success = false;
    if (!this.type) {
      this.error = 'Empty feedback type!';
      return;
    }
    if (!this.info) {
      this.error = 'Empty feedback info!';
      return;
    }

    let feedbackData = {
      cusUsername: this.userId,
      feedback: {
        type: this.type,
        info: this.info
      }
    };
    // valid input.
    this.error = '';
    // send post feedback request to backend
    this.http.post<any>('http://localhost:8080/postfeedback', feedbackData).subscribe(
      (response) => {
        this.feedbackResponse = response;
        if (!this.feedbackResponse.success) {
          this.error = this.feedbackResponse.failureReason;
        }
        this.success = this.feedbackResponse.success;
      },
      (error) => {
        this.feedbackerror = error.message;
        this.success = this.feedbackResponse.success;
        console.error(error);
      }
    );
  }
}
