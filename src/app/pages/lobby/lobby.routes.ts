import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCommerceComponent } from './commerce/commerce/list-commerce/list-commerce.component';
import { NewCommerceComponent } from './commerce/commerce/new-commerce/new-commerce.component';
import { ListTypeCommerceComponent } from './commerce/type-commerce/list-type-commerce/list-type-commerce.component';
import { LobbyComponent } from './lobby.component';
import { NewTypeCommerceComponent } from '../lobby/commerce/type-commerce/new-type-commerce/new-type-commerce.component';
import { HomeComponent } from './home/home.component';
import { ListOwmerComponent } from './users/owner/list-owmer/list-owmer.component';
import { NewOwmerComponent } from './users/owner/new-owmer/new-owmer.component';
import { ListClientComponent } from './users/client/list-client/list-client.component';
import { NewClientComponent } from './users/client/new-client/new-client.component';
import { ListAdminComponent } from './users/admin/list-admin/list-admin.component';
import { NewAdminComponent } from './users/admin/new-admin/new-admin.component';
// import { ProfileComponent } from '../auth/profile/profile.component';
import { MyCommerceComponent } from './commerce/my-commerce/my-commerce.component';
import { HomeClientsComponent } from '../lobby/home/home-clients/home-clients.component';
import { HomeOwnersComponent } from '../lobby/home/home-owners/home-owners.component';
import { ListClientsComponent } from './users/owner/list-clients/list-clients.component';
import { NewClientsComponent } from './users/owner/new-clients/new-clients.component';
import { EditOwnerComponent } from './users/owner/edit-owner/edit-owner.component';
import { EditClientComponent } from './users/client/edit-client/edit-client.component';
import { ListReserveClientComponent } from './home/list-reserve-client/list-reserve-client.component';

const routes: Routes = [
    {
        path: '',
        component : LobbyComponent,
        children: [

            // { path: 'home', component: HomeComponent, data : { tittle : 'Home' } },

            // { path: 'profile', component: ProfileComponent, data : { tittle : 'Profile' } },

            { path: 'list/commerce', component: ListCommerceComponent, data : { tittle : 'Commerce' } },
            { path: 'new/commerce/:id', component: NewCommerceComponent, data : { tittle : 'Commerce' } },
            { path: 'commerce', component: MyCommerceComponent, data : { tittle : 'Commerce' } },

            { path: 'list/type/commerce', component: ListTypeCommerceComponent, data : { tittle : 'Commerce' } },
            { path: 'new/type/commerce/:id', component: NewTypeCommerceComponent, data : { tittle : 'Commerce' } },

            { path: 'list/owner', component: ListOwmerComponent, data : { tittle : 'Owner' } },
            { path: 'new/owner/:id', component: NewOwmerComponent, data : { tittle : 'Owner' } },
            { path: 'edit/owner/:id', component: EditOwnerComponent, data : { tittle : 'Owner' } },
            { path: 'list/owner/client', component: ListClientsComponent, data : { tittle : 'Client' } },
            { path: 'new/owner/client/:id', component: NewClientsComponent, data : { tittle : 'Client' } },

            { path: 'list/client', component: ListClientComponent, data : { tittle : 'Client' } },
            { path: 'new/client/:id', component: NewClientComponent, data : { tittle : 'Client' } },
            { path: 'edit/client/:id', component: EditClientComponent, data : { tittle : 'Client' } },

            { path: 'list/admin', component: ListAdminComponent, data : { tittle : 'Reservas' } },
            { path: 'new/admin/:id', component: NewAdminComponent, data : { tittle : 'Reservas' } },

            { path: 'list/reserve/client', component: ListReserveClientComponent, data : { tittle : 'Reservas' } },
            { path: 'home/clients', component: HomeClientsComponent, data : { tittle : 'Reservas' } },
            { path: 'home/owners', component: HomeOwnersComponent, data : { tittle : 'Reservas' } },
            

            { path : '', redirectTo : 'home', pathMatch : 'full' }, 
        ]
    }
];

export const ADMIN_ROUTES  = RouterModule.forChild( routes );
