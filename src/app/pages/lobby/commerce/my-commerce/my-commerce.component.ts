import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commerce } from 'src/app/core/models/commerce.model';
import { CommerceService } from 'src/app/core/services/commerce/commerce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-commerce',
  templateUrl: './my-commerce.component.html',
  styleUrls: ['./my-commerce.component.css']
})
export class MyCommerceComponent implements OnInit {

  commerceModel = new Commerce;
  commerceForm: FormGroup;

  typeOfCommerce : any;
  commerceSelected : any;
  owner : any;
  ownerSelected : any;
  hour : boolean = true;

  constructor(
    private _commerceService : CommerceService,
    private _fb: FormBuilder,
    private router : Router
  ) {
    this.CommerceForm();
   }

  ngOnInit(): void {
    this.commerce();
  }

  onSubmit(){
    this.commerceModel = this.commerceForm.value;
    console.log(this.commerceModel);
    this._commerceService.updateCommerce( this.commerceModel )
    .subscribe(
      ( res : any ) => {
        Swal.fire(
          'Comercio Creado',
          'Presiona OK',
          'success'
        );
        this.router.navigateByUrl('/lobby/home/owners' );
      }
    )
  }
  
  commerce(){
    this._commerceService.getCommerce( localStorage.getItem('id') )
    .subscribe(
      ( res : any ) => {
        this.commerceForm.controls['id'].setValue(res.data[0].id);
        this.commerceForm.controls['owner_id'].setValue(res.data[0].owner_id);
        this.commerceForm.controls['type_commerce'].setValue(res.data[0].type_commerce);
        this.commerceForm.controls['name'].setValue(res.data[0].name);
        this.commerceForm.controls['description'].setValue(res.data[0].description);
        this.commerceForm.controls['opening'].setValue(res.data[0].opening);
        this.commerceForm.controls['closing'].setValue(res.data[0].closing);
        this.commerceForm.controls['direction'].setValue(res.data[0].direction);
      }
    )
  }

  validateHour( hour1 : any, hour2 : any) : boolean {
    console.log(this.commerceForm.get('opening').value,this.commerceForm.get('closing').value);
    if (hour1 < hour2) {
      return this.hour = true;
    } else {
      return this.hour = false;
    }
  }

  get invalidName() {
    return (
      this.commerceForm.get('name').invalid &&
      this.commerceForm.get('name').touched
    );
  }
  get invalidDirection() {
    return (
      this.commerceForm.get('direction').invalid &&
      this.commerceForm.get('direction').touched
    );
  }
  get invaliOpening() {
    return (
      this.commerceForm.get('opening').invalid &&
      this.commerceForm.get('opening').touched
    );
  }
  get invaliClosing() {
    return (
      this.commerceForm.get('closing').invalid &&
      this.commerceForm.get('closing').touched
    );
  }
  get invaliDescription() {
    return (
      this.commerceForm.get('description').invalid &&
      this.commerceForm.get('description').touched
    );
  }

  CommerceForm(){
    this.commerceForm = this._fb.group({
      id: [''],
      owner_id: [''],
      type_commerce: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      closing: ['', [Validators.required]],
      opening: ['', [Validators.required]],
      direction: ['', [Validators.required]],
    });
  }
}
