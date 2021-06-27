import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTypeCommerceComponent } from './commerce/type-commerce/list-type-commerce/list-type-commerce.component';
import { NewTypeCommerceComponent } from './commerce/type-commerce/new-type-commerce/new-type-commerce.component';
import { ListOwmerComponent } from './users/owner/list-owmer/list-owmer.component';
import { NewOwmerComponent } from './users/owner/new-owmer/new-owmer.component';
import { NewClientComponent } from './users/client/new-client/new-client.component';
import { ListClientComponent } from './users/client/list-client/list-client.component';
import { NewCommerceComponent } from './commerce/commerce/new-commerce/new-commerce.component';
import { ListCommerceComponent } from './commerce/commerce/list-commerce/list-commerce.component';
import { ADMIN_ROUTES } from '../lobby/lobby.routes'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ListAdminComponent } from './users/admin/list-admin/list-admin.component';
import { NewAdminComponent } from './users/admin/new-admin/new-admin.component';
import { MyCommerceComponent } from './commerce/my-commerce/my-commerce.component';
import { HomeClientsComponent } from './home/home-clients/home-clients.component';
import { HomeOwnersComponent } from './home/home-owners/home-owners.component';
import { ListClientsComponent } from './users/owner/list-clients/list-clients.component';
import { NewClientsComponent } from './users/owner/new-clients/new-clients.component';
import { EditOwnerComponent } from './users/owner/edit-owner/edit-owner.component';
import { EditClientComponent } from './users/client/edit-client/edit-client.component';
import { ListReserveClientComponent } from './home/list-reserve-client/list-reserve-client.component';


@NgModule({
  declarations: [ 
    ListTypeCommerceComponent, 
    NewTypeCommerceComponent, 
    ListOwmerComponent, 
    NewOwmerComponent, 
    NewClientComponent, 
    ListClientComponent, 
    NewCommerceComponent, 
    ListCommerceComponent, 
    HomeComponent, 
    NavbarComponent, 
    FooterComponent, 
    ListAdminComponent, 
    NewAdminComponent, 
    MyCommerceComponent,
    HomeClientsComponent,
    HomeOwnersComponent,
    ListClientsComponent,
    NewClientsComponent,
    EditOwnerComponent,
    EditClientComponent,
    ListReserveClientComponent
  ],
  
  exports: [
    NavbarComponent, 
    FooterComponent,
  ],
  
  imports: [
    CommonModule,
    ADMIN_ROUTES,
    // Home_Routes,
    FormsModule,  
    ReactiveFormsModule,
    // HomeModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LobbyModule { }
