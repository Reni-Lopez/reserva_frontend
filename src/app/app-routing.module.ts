import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginClientsComponent } from './pages/auth/login-clients/login-clients.component';
import { LoginOwnersComponent } from './pages/auth/login-owners/login-owners.component';
import { LoginComponent } from './pages/auth/login/login.component';


const routes: Routes = [
  
    { path: 'login', component: LoginComponent, },

    { path: 'login/clients', component: LoginClientsComponent, },

    { path: 'login/owners', component: LoginOwnersComponent, },

    {
      path: 'lobby',
      loadChildren: () => import('./pages/lobby/lobby.module').then(m => m.LobbyModule),
    },

  //   {
  //     path: 'home',
  //     loadChildren: () => import('./pages/lobby/home/home.module').then(m => m.HomeModule),
  // },

    { path : '', redirectTo : 'login/clients', pathMatch : 'full' },
    { path: '**', component: LoginComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


