import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { CovidDashboardComponent } from './covid-dashboard/covid-dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { RegisterComponent } from './register/register.component';
import { CovidSummaryComponent } from './covid-summary/covid-summary.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path : 'list', component: CovidDashboardComponent, canActivate : [RouteGuardService]},
  { path : 'summary', component: CovidSummaryComponent, canActivate : [RouteGuardService]},
  { path: 'logout', component: LogoutComponent, canActivate : [RouteGuardService]},
  { path : '**' , component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
