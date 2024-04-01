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
  error!: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const tmp = this.route.snapshot.paramMap.get('userId');
    if (tmp) {
      this.userId = tmp;
    }
    this.sendViewRequest();
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
}
