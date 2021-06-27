import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/core/models/Owner.model';
import { OwnerService } from 'src/app/core/services/owner/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css']
})
export class EditOwnerComponent implements OnInit {

  owner: FormGroup;
  ownerModel = new Owner;
  button = 1;
  password = true;
  
  constructor(
    private _ownerService : OwnerService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private router : Router
  ) {
    this.ownerForm();
  }
  ngOnInit(): void {
    this.loadData();
  }
  onSubmit(){
    const id = this._route.snapshot.paramMap.get('id');
    if (id === 'new') {
      // this.createOwner();
    } else {
      this.updateOwner();
    }
  }
  updateOwner(){

    this.ownerModel.id = this.owner.get('id').value;
    this.ownerModel.name = this.owner.get('name').value;
    this.ownerModel.email = this.owner.get('email').value;
    this.ownerModel.password = this.owner.get('password').value;
    this.ownerModel.role = '2';

    if (this.equalsPassword(this.owner.get('password').value,this.owner.get('confirm_password').value)) {
      this._ownerService.updateOwner( this.ownerModel )
    .subscribe(
      ( resp : any) => {
        this._ownerService.findOwnerById(localStorage.getItem('id'))
        .subscribe(
          ( resp : any ) => {
            localStorage.setItem('name',resp.data.name);
          }
        )
                
        Swal.fire(
          'Comerciante Actualizado',
          'Presiona OK',
          'success'
        );
        this.router.navigateByUrl('/lobby/home/owners' );
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

  loadData() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.button = 2;

      this._ownerService
        .findOwnerById( id )
        .subscribe( ( resp: any ) => {
          
          this.owner.controls['id'].setValue(resp.data.id);
          this.owner.controls['name'].setValue(resp.data.name);
          this.owner.controls['email'].setValue(resp.data.email);
          this.owner.controls['password'].setValue(resp.data.password);

        });
    }
  }

  get invalidName() {
    return (
      this.owner.get('name').invalid &&
      this.owner.get('name').touched
    );
  }
  get invalidEmail() {
    return (
      this.owner.get('email').invalid &&
      this.owner.get('email').touched
    );
  }
  get invalidPassword() {
    return (
      this.owner.get('password').invalid &&
      this.owner.get('password').touched
    );
  }
  get invalidConfirmPassword() {
    return (
      this.owner.get('confirm_password').invalid &&
      this.owner.get('confirm_password').touched
    );
  }
  ownerForm(){
    this.owner = this._fb.group({
          id: [''],
          name:  ['', [Validators.required]],
          email: ['', [Validators.required]],
          password:  ['', [Validators.required, Validators.minLength(8)]],
          confirm_password: ['', [Validators.required]],
          role: [''],
    });
  }


}


