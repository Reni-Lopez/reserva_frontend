import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Owner } from 'src/app/core/models/Owner.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { OwnerService } from 'src/app/core/services/owner/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-owners',
  templateUrl: './login-owners.component.html',
  styleUrls: ['./login-owners.component.css']
})
export class LoginOwnersComponent implements OnInit {

  user: Owner = new Owner();
  
  constructor( private _router: Router, private _ownerService: OwnerService ) { }

  ngOnInit(): void {
  }

  onSubmit( form: NgForm ): void {
    if ( form.invalid){ return; }

    Swal.fire({
      allowOutsideClick : false,
      icon: 'info',
      title: 'Espere por favor'
    });
    Swal.showLoading();

    this._ownerService.login( this.user).subscribe( resp => {
        Swal.close();
        this._router.navigateByUrl('lobby/home/owners');
    }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectos'
        });
    });
  }
}


