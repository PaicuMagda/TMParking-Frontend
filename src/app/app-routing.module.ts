import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login-register-components/login/login.component';
import { CreateAccountComponent } from './Components/login-register-components/create-account/create-account.component';
import { RecoverAccountComponent } from './Components/login-register-components/recover-account/recover-account.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'create-account',
    component: CreateAccountComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'recover-account',
    component: RecoverAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
