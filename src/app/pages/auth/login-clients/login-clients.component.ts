import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/models/Client.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-clients',
  templateUrl: './login-clients.component.html',
  styleUrls: ['./login-clients.component.css']
})
export class LoginClientsComponent implements OnInit {

  user: Client = new Client();

  constructor( private _router: Router, private _clientService: ClientService ) { }

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

    this._clientService.login( this.user).subscribe( resp => {
        Swal.close();
        this._router.navigateByUrl('lobby/list/reserve/client');
    }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectos'
        });
    });
  }
}

