import { Component, OnInit } from '@angular/core';
import { TypeCommerce } from 'src/app/core/models/TypeCommerce.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { CommerceService } from '../../../../../core/services/commerce/commerce.service';

@Component({
  selector: 'app-list-type-commerce',
  templateUrl: './list-type-commerce.component.html',
  styleUrls: ['./list-type-commerce.component.css']
})
export class ListTypeCommerceComponent implements OnInit {

  isAdmin : boolean = this._authService.isAdmin();
  commerce : TypeCommerce[];
  load = false;

  constructor(
    private _authService : AuthService,
    private _commerceService : CommerceService
  ) { }

  ngOnInit(): void {
    this.load = true;
    this.getAllTypeCommerce();
  }
  getAllTypeCommerce(){
    this._commerceService.getAllTypeCommerce()
    .subscribe( ( resp : any ) => { 
      this.commerce = resp.data;
      this.load = false;
    });
  }

  delete( commerce : TypeCommerce ){
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
        this._commerceService.deleteTypeCommerce( commerce.id ).subscribe( ( resp : any ) => {
          this.getAllTypeCommerce();
          Swal.fire(
            'Tipo de Commercio Eliminado',
            'Click ok',
            'success'
          )
        });
      }
    })
  }

}
