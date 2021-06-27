import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { Owner } from "../../../../../core/models/Owner.model";
import { OwnerService } from "../../../../../core/services/owner/owner.service";

@Component({
  selector: 'app-list-owmer',
  templateUrl: './list-owmer.component.html',
  styleUrls: ['./list-owmer.component.css']
})
export class ListOwmerComponent implements OnInit {

  isAdmin : boolean = this._authService.isAdmin();
  owner : Owner[];
  load = false;

  constructor(
    private _authService : AuthService,
    private _ownertService : OwnerService
  ) { }

    ngOnInit(): void {
    this.load = true;
    this.getAllOwner();
  }
  getAllOwner(){
    this._ownertService.getAllOwner()
    .subscribe( ( resp : any ) => { 
      this.owner = resp.data;
      this.load = false;
    });
  }
  delete( owner : Owner ){
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
        this._ownertService.deleteOwner( owner.id ).subscribe( ( resp : any ) => {
          this.getAllOwner();
          Swal.fire(
            'Comerciante Actualizado',
            'Presiona OK',
            'success'
          );
        },
        (error) => {
          Swal.fire('Error!', 'Comerciante Ligado a Citas Previas', 'error');
        });
      }
    })
  }
}

