import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IconsModule } from './shared/icons/icons.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login-register-components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CreateAccountComponent } from './Components/login-register-components/create-account/create-account.component';
import { RecoverAccountComponent } from './Components/login-register-components/recover-account/recover-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './Components/home/nav-bar/nav-bar.component';
import { HomeComponent } from './Components/home/home/home.component';
import { LayoutComponent } from './Components/home/layout/layout.component';
import { MaterialModule } from './shared/material/material.module';
import { TmParkingInfoDialogComponent } from './Components/dialogs/tm-parking-info-dialog/tm-parking-info-dialog.component';
import { AddNewParkingSpaceDialogComponent } from './Components/dialogs/add-new-parking-space-dialog/add-new-parking-space-dialog.component';
import { SearchComponent } from './Components/home/search/search.component';
import { OpenSidenavComponent } from './shared/components/open-sidenav/open-sidenav.component';
import { NavbarService } from './services/navbar.service';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LogoutDialogComponent } from './Components/dialogs/logout-dialog/logout-dialog.component';
import { LoginRequiredDialogComponent } from './Components/dialogs/login-required-dialog/login-required-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { ResetPasswordComponent } from './Components/login-register-components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    RecoverAccountComponent,
    NavBarComponent,
    HomeComponent,
    LayoutComponent,
    TmParkingInfoDialogComponent,
    AddNewParkingSpaceDialogComponent,
    SearchComponent,
    OpenSidenavComponent,
    LogoutDialogComponent,
    LoginRequiredDialogComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IconsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NgToastModule,
    MatDividerModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    NavbarService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
