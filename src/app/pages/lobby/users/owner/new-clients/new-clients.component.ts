import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/core/models/Client.model';
import { ClientCommerce } from 'src/app/core/models/ClientCommerce.model';
import { ClientService } from 'src/app/core/services/client/client.service';
import { CommerceService } from 'src/app/core/services/commerce/commerce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-clients',
  templateUrl: './new-clients.component.html',
  styleUrls: ['./new-clients.component.css']
})
export class NewClientsComponent implements OnInit {

  client: FormGroup;
  clientCommerceModel = new ClientCommerce;
  clientModel = new Client;
  button = 1;
  password = true;

  constructor(
    private _clientService : ClientService,
    private _commerceService : CommerceService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private router : Router
  ) {
    this.clientForm();
  }
  ngOnInit(): void {  }
  onSubmit(){
    const id = this._route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.createClient();
    } 
  }
  createClient(){
    this.clientModel.id = this.client.get('id').value;
    this.clientModel.name = this.client.get('name').value;
    this.clientModel.email = this.client.get('email').value;
    this.clientModel.password = this.client.get('password').value;
    this.clientModel.phone = this.client.get('phone').value;
    this.clientModel.role = '3';

    if (this.equalsPassword(this.client.get('password').value,this.client.get('confirm_password').value)) {
      this._clientService.createCLient( this.clientModel )
    .subscribe(
      ( resp : any) => {
        this._commerceService.getCommerceByOwner( localStorage.getItem('id'))
        .subscribe(
          ( res : any ) => {
            
            this.clientCommerceModel.client_fk = resp.id;
              this.clientCommerceModel.commerce_fk = res.data[0].id;

              this._clientService.createClientCommerce( this.clientCommerceModel )
              .subscribe( );
          }
        )
        
        Swal.fire(
          'Cliente Creado',
          'Presiona OK',
          'success'
        );
        this.router.navigateByUrl('/lobby/list/owner/client' );
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
    } 
  }

  equalsPassword( pass1 : any, pass2 : any) : boolean{
    if (pass1 === pass2) 
    return this.password = true;
      else 
      return this.password = false;
  }

  get invalidName() {
    return (
      this.client.get('name').invalid &&
      this.client.get('name').touched
    );
  }
  get invalidEmail() {
    return (
      this.client.get('email').invalid &&
      this.client.get('email').touched
    );
  }
  get invalidPassword() {
    return (
      this.client.get('password').invalid &&
      this.client.get('password').touched
    );
  }
  get invalidConfirmPassword() {
    return (
      this.client.get('confirm_password').invalid &&
      this.client.get('confirm_password').touched
    );
  }
  get invalidPhone() {
    return (
      this.client.get('phone').invalid &&
      this.client.get('phone').touched
    );
  }
  clientForm(){
    this.client = this._fb.group({
          id: [''],
          name:  ['', [Validators.required]],
          email: ['', [Validators.required]],
          password:  ['', [Validators.required, Validators.minLength(8)]],
          confirm_password: ['', [Validators.required]],
          phone: ['', [Validators.required]],
          role: [''],
    });
  }

}
