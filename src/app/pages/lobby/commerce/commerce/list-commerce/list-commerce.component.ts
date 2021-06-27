import { Component, OnInit } from '@angular/core';
import { Commerce } from 'src/app/core/models/commerce.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CommerceService } from 'src/app/core/services/commerce/commerce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-commerce',
  templateUrl: './list-commerce.component.html',
  styleUrls: ['./list-commerce.component.css']
})
export class ListCommerceComponent implements OnInit {

  isAdmin : boolean = this._authService.isAdmin();
  commerce : Commerce[];
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
    this._commerceService.getAllCommerce()
    .subscribe( ( resp : any ) => { 
      this.commerce = resp.data;
      this.load = false;
    });
  }
  delete( commerce : Commerce ){
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
        this._commerceService.deleteCommerce( commerce.id ).subscribe( ( resp : any ) => {
          this.getAllTypeCommerce();
          Swal.fire(
            'Commercio Eliminado',
            'Click ok',
            'success'
          )
        });
      }
    })
  }
}
