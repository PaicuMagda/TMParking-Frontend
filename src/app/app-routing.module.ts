import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login-register-components/login/login.component';
import { CreateAccountComponent } from './Components/login-register-components/create-account/create-account.component';
import { RecoverAccountComponent } from './Components/login-register-components/recover-account/recover-account.component';
import { HomeComponent } from './Components/home/home/home.component';
import { ResetPasswordComponent } from './Components/login-register-components/reset-password/reset-password.component';
import { ParkingSpaceDetailsComponent } from './Components/parking-space-details/parking-space-details.component';
import { TablesComponent } from './Components/tables/tables.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'create-account',
    component: CreateAccountComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'recover-account',
    component: RecoverAccountComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },

  {
    path: 'parking-space-details/:id',
    component: ParkingSpaceDetailsComponent,
  },
  {
    path: 'tables',
    component: TablesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
