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
import { SearchComponent } from './Components/home/search/parking-search/search.component';
import { NavbarService } from './services/navbar.service';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LogoutDialogComponent } from './Components/dialogs/logout-dialog/logout-dialog.component';
import { LoginRequiredDialogComponent } from './Components/dialogs/login-required-dialog/login-required-dialog.component';
import { ResetPasswordComponent } from './Components/login-register-components/reset-password/reset-password.component';
import { AddNewVehicleDialogComponent } from './Components/dialogs/add-new-vehicle-dialog/add-new-vehicle-dialog.component';
import { MyProfileDialogComponent } from './Components/dialogs/my-profile-dialog/my-profile-dialog.component';
import { AddNewUserDialogComponent } from './Components/dialogs/add-new-user-dialog/add-new-user-dialog.component';
import { UsersAdminComponent } from './Components/users-admin/users-admin.component';
import { CarSearchComponent } from './Components/home/search/car-search/car-search.component';
import { UserSearchComponent } from './Components/home/search/user-search/user-search.component';

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
    LogoutDialogComponent,
    LoginRequiredDialogComponent,
    ResetPasswordComponent,
    AddNewVehicleDialogComponent,
    MyProfileDialogComponent,
    AddNewUserDialogComponent,
    UsersAdminComponent,
    SearchComponent,
    CarSearchComponent,
    UserSearchComponent,
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
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    NavbarService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
