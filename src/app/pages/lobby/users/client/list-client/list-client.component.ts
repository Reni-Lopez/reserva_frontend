import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { Client } from "../../../../../core/models/Client.model";
import { ClientService } from "../../../../../core/services/client/client.service";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  isAdmin : boolean = this._authService.isAdmin();
  client : any;
  load = false;
  lenghData : any;

  constructor(
    private _authService : AuthService,
    private _clientService : ClientService
  ) { }

  ngOnInit(): void {
    this.getAllClient();
    this.load = true; 

  }

  getAllClient(){
    this._clientService.getAllClient().then(
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
      text: "Será Eliminado Permanentemente!",
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
            'Comerciante Actualizado',
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

