import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { ReserveComponent } from './reserve/reserve.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { FaqsComponent } from './faqs/faqs.component';
import { DonationComponent } from './donation/donation.component';
import { ThankdonationComponent } from './donation/thankdonation/thankdonation.component';
import { JoinusComponent } from './joinus/joinus.component';
import { ThankjoinusComponent } from './joinus/thankjoinus/thankjoinus.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    ReserveComponent,
    MaintenanceComponent,
    FaqsComponent,
    DonationComponent,
    ThankdonationComponent,
    JoinusComponent,
    ThankjoinusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
