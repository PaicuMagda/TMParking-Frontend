import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IconsModule } from './shared/icons/icons.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login-register-components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CreateAccountComponent } from './Components/login-register-components/create-account/create-account.component';
import { RecoverAccountComponent } from './Components/login-register-components/recover-account/recover-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './Components/home/nav-bar/nav-bar.component';
import { HomeComponent } from './Components/home/home/home.component';
import { LayoutComponent } from './Components/home/layout/layout.component';
import { MaterialModule } from './shared/material/material.module';
import { TmParkingInfoDialogComponent } from './Components/home/tm-parking-info-dialog/tm-parking-info-dialog.component';
import { AddNewParkingSpaceDialogComponent } from './Components/home/add-new-parking-space-dialog/add-new-parking-space-dialog.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IconsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
