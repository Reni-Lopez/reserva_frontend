import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LobbyModule } from './pages/lobby/lobby.module'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ADMIN_ROUTES } from './pages/lobby/lobby.routes';
import { RouterModule } from '@angular/router';
// import { ProfileComponent } from './pages/auth/profile/profile.component';
import { LoginClientsComponent } from './pages/auth/login-clients/login-clients.component';
import { LoginOwnersComponent } from './pages/auth/login-owners/login-owners.component';
import { HomeOwnersComponent } from './pages/lobby/home/home-owners/home-owners.component';
import { HomeClientsComponent } from './pages/lobby/home/home-clients/home-clients.component';


@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    LoginComponent,
    // ProfileComponent,
    LoginClientsComponent,
    LoginOwnersComponent,
    // HomeClientsComponent,
    // HomeOwnersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LobbyModule,
    FormsModule, 
    CommonModule,
    HttpClientModule,
    RouterModule,
    // Home_Routes
    // HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
