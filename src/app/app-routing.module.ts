import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'view/:userId', component: ViewComponent },
  { path: 'post/:accountType/:accountId', component: PostComponent },
  { path: 'reserve/:userId/:foodName/:restUsername/:amount', component: ReserveComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'donation', component: DonationComponent },
  { path: 'thankdonation', component: ThankdonationComponent },
  { path: 'joinus', component: JoinusComponent },
  { path: 'thankjoinus', component: ThankjoinusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
