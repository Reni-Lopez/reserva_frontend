import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../core/models/auth.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor( private _router: Router, private _auth_service: AuthService ) { }

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

    this._auth_service.login( this.user).subscribe( resp => {
        Swal.close();
        this._router.navigateByUrl('lobby/home');
    }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectos'
        });
    });
  }
}
