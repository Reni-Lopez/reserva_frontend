import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/core/models/Client.model';
import { ClientService } from 'src/app/core/services/client/client.service';
import { OwnerService } from 'src/app/core/services/owner/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  client : any[];
  load = false;
  lenghData : any;

  constructor(
    private _ownerService : OwnerService,
    private _clientService : ClientService
  ) { }

  ngOnInit(): void {
    this.getAllClient();
    this.load = true; 
  }

  getAllClient(){
    this._ownerService.getClientOfCommerce(localStorage.getItem('id')).then(
      ( res : any ) => {
        this.client = res.data;
        this.load = false;
        this.lenghData = this.client.length;
      }
    );
  }

  delete( client : Client ){
    Swal.fire({
      title: 'Está Seguro?',
      text: "Se Eliminará este Cliente de tu Comercio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then( ( result ) => {
      if ( result.isConfirmed ) {
        this._clientService.deleteClient( client.id ).subscribe( ( resp : any ) => {
          this.getAllClient();
          Swal.fire(
            'Cliente Eliminado',
            'Presiona OK',
            'success'
          );
        },
        (error) => {
          Swal.fire('Error!', error.error.error, 'error');
        });
      }
    })
  }

}
