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
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Components/home/home/home.component';
import { MaterialModule } from './shared/material/material.module';
import { TmParkingInfoDialogComponent } from './Components/dialogs/tm-parking-info-dialog/tm-parking-info-dialog.component';
import { AddNewParkingSpaceDialogComponent } from './Components/dialogs/add-new-parking-space-dialog/add-new-parking-space-dialog.component';
import { NavbarService } from './services/navbar.service';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LogoutDialogComponent } from './Components/dialogs/confirmation-dialogs/logout-dialog/logout-dialog.component';
import { LoginRequiredDialogComponent } from './Components/dialogs/confirmation-dialogs/login-required-dialog/login-required-dialog.component';
import { ResetPasswordComponent } from './Components/login-register-components/reset-password/reset-password.component';
import { AddNewVehicleDialogComponent } from './Components/dialogs/add-new-vehicle-dialog/add-new-vehicle-dialog.component';
import { MyProfileDialogComponent } from './Components/dialogs/my-profile-dialog/my-profile-dialog.component';
import { AddNewUserDialogComponent } from './Components/dialogs/add-new-user-dialog/add-new-user-dialog.component';
import { UsersAdminComponent } from './Components/users-admin/users-admin.component';
import { UserSearchComponent } from './Components/home/search/user-search/user-search.component';
import { SaveChangesDialogComponent } from './Components/dialogs/confirmation-dialogs/save-changes-dialog/save-changes-dialog.component';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { ParkingSpaceSearchComponent } from './Components/home/search/parking-space-search/parking-space-search.component';
import { VehicleSearchComponent } from './Components/home/search/vehicle-search/vehicle-search.component';
import { ParkingSpacesComponent } from './Components/parking-spaces/parking-spaces.component';
import { DeleteConfirmationDialogComponent } from './Components/dialogs/confirmation-dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ConfirmCloseDialogComponent } from './Components/dialogs/confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';
import { DisplayCardsComponent } from './Components/display-cards/display-cards.component';
import { ParkingSpaceDetailsComponent } from './Components/parking-space-details/parking-space-details.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { TablesComponent } from './Components/tables/tables.component';
import { ParkingSpaceTableComponent } from './Components/tables/parking-space-table/parking-space-table.component';
import { UsersTableComponent } from './Components/tables/users-table/users-table.component';
import { VehiclesTableComponent } from './Components/tables/vehicles-table/vehicles-table.component';
import { RentingParkingSpacesComponent } from './Components/tables/renting-parking-spaces/renting-parking-spaces.component';
import { ConfirmationParkingSpaceExpiredDialogComponent } from './Components/dialogs/confirmation-parking-space-expired-dialog/confirmation-parking-space-expired-dialog.component';
import { HoverElementDirective } from './Components/directives/hover-element.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    RecoverAccountComponent,
    NavBarComponent,
    HomeComponent,
    TmParkingInfoDialogComponent,
    AddNewParkingSpaceDialogComponent,
    LogoutDialogComponent,
    LoginRequiredDialogComponent,
    ResetPasswordComponent,
    AddNewVehicleDialogComponent,
    MyProfileDialogComponent,
    AddNewUserDialogComponent,
    UsersAdminComponent,
    UserSearchComponent,
    SaveChangesDialogComponent,
    VehiclesComponent,
    ParkingSpaceSearchComponent,
    VehicleSearchComponent,
    ParkingSpacesComponent,
    DeleteConfirmationDialogComponent,
    ConfirmCloseDialogComponent,
    DisplayCardsComponent,
    ParkingSpaceDetailsComponent,
    TablesComponent,
    ParkingSpaceTableComponent,
    UsersTableComponent,
    VehiclesTableComponent,
    RentingParkingSpacesComponent,
    ConfirmationParkingSpaceExpiredDialogComponent,
    HoverElementDirective,
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
    NgxMatFileInputModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    NavbarService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
