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
import { SaveChangesDialogComponent } from './Components/dialogs/confirmation-dialogs/save-changes-dialog-vehicle/save-changes-dialog.component';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { ParkingSpaceSearchComponent } from './Components/home/search/parking-space-search/parking-space-search.component';
import { VehicleSearchComponent } from './Components/home/search/vehicle-search/vehicle-search.component';
import { ParkingSpacesComponent } from './Components/parking-spaces/parking-spaces.component';
import { DeleteConfirmationDialogComponent } from './Components/dialogs/confirmation-dialogs/delete-vehicle-confirmation-dialog/delete-confirmation-dialog.component';
import { ConfirmCloseDialogComponent } from './Components/dialogs/confirmation-dialogs/confirm-close-dialog/confirm-close-dialog.component';
import { DisplayCardsComponent } from './Components/display-cards/display-cards.component';
import { ParkingSpaceDetailsComponent } from './Components/parking-space-details/parking-space-details.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { TablesComponent } from './Components/tables/tables.component';
import { ParkingSpaceTableComponent } from './Components/tables/parking-space-table/parking-space-table.component';
import { UsersTableComponent } from './Components/tables/users-table/users-table.component';
import { VehiclesTableComponent } from './Components/tables/vehicles-table/vehicles-table.component';
import { ConfirmationParkingSpaceExpiredDialogComponent } from './Components/dialogs/confirmation-parking-space-expired-dialog/confirmation-parking-space-expired-dialog.component';
import { LegendComponent } from './Components/legend/legend.component';
import { HourFormatPipe } from './pipes/hour-format.pipe';
import { ParkingReservationsComponent } from './Components/tables/parking-reservations/parking-reservations.component';
import { MyReservationsComponent } from './Components/tables/my-reservations/my-reservations.component';
import { AuthGuard } from './guards/auth.guard';
import { LeavePageDialogComponent } from './Components/dialogs/confirmation-dialogs/leave-page-dialog/leave-page-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteParkingSpacesConfirmationDialogComponent } from './Components/dialogs/confirmation-dialogs/delete-parking-spaces-confirmation-dialog/delete-parking-spaces-confirmation-dialog/delete-parking-spaces-confirmation-dialog.component';
import { DeleteUserAccountConfirmationDialogComponent } from './Components/dialogs/confirmation-dialogs/delete-user-account-confirmation-dialog/delete-user-account-confirmation-dialog.component';
import { ParkingSpacesDialogEditComponent } from './Components/dialogs/parking-spaces-dialog-edit/parking-spaces-dialog-edit.component';
import { VehicleEditDialogComponent } from './Components/dialogs/vehicle-edit-dialog/vehicle-edit-dialog.component';
import { UserEditDialogComponent } from './Components/dialogs/user-edit-dialog/user-edit-dialog.component';
import { ChartsComponent } from './Components/charts/charts.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsComponent } from './Components/google-maps/google-maps.component';
import { ParkingSpaceReservationsTableComponent } from './Components/parking-space-details/parking-space-reservations-table/parking-space-reservations-table.component';
import { BookingParkingLotComponent } from './Components/parking-space-details/booking-parking-lot/booking-parking-lot.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { UsersChartsComponent } from './Components/charts/users-charts/users-charts.component';
import { ParkingSpacesChartsComponent } from './Components/charts/parking-spaces-charts/parking-spaces-charts.component';
import { VehiclesChartsComponent } from './Components/charts/vehicles-charts/vehicles-charts.component';
import { ReservationsChartsComponent } from './Components/charts/reservations-charts/reservations-charts.component';
import { DeleteReservationConfirmationDialogComponent } from './Components/dialogs/confirmation-dialogs/delete-reservation-confirmation-dialog/delete-reservation-confirmation-dialog.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaymentDialogComponent } from './Components/dialogs/payment-dialog/payment-dialog.component';
import { ReservationsDialogComponent } from './Components/parking-space-details/reservations-dialog/reservations-dialog.component';
import { HoverElementDirective } from './directives/hover-element.directive';
import { PlaceAutocompleteComponent } from './Components/google-maps/place-autocomplete/place-autocomplete.component';
import { MapDisplayComponent } from './Components/google-maps/map-display/map-display.component';

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
    ConfirmationParkingSpaceExpiredDialogComponent,
    LegendComponent,
    HourFormatPipe,
    ParkingReservationsComponent,
    MyReservationsComponent,
    LeavePageDialogComponent,
    DeleteParkingSpacesConfirmationDialogComponent,
    DeleteUserAccountConfirmationDialogComponent,
    ParkingSpacesDialogEditComponent,
    VehicleEditDialogComponent,
    UserEditDialogComponent,
    ChartsComponent,
    GoogleMapsComponent,
    ParkingSpaceReservationsTableComponent,
    BookingParkingLotComponent,
    UsersChartsComponent,
    ParkingSpacesChartsComponent,
    VehiclesChartsComponent,
    ReservationsChartsComponent,
    DeleteReservationConfirmationDialogComponent,
    PaymentDialogComponent,
    ReservationsDialogComponent,
    HoverElementDirective,
    PlaceAutocompleteComponent,
    MapDisplayComponent,
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
    GoogleMapsModule,
    GoogleChartsModule,
    NgxPayPalModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthGuard,
    {
      provide: MatDialogRef,
      useValue: {},
    },
    HourFormatPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
