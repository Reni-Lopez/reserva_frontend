import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeCommerce } from 'src/app/core/models/TypeCommerce.model';
import { CommerceService } from 'src/app/core/services/commerce/commerce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-type-commerce',
  templateUrl: './new-type-commerce.component.html',
  styleUrls: ['./new-type-commerce.component.css']
})
export class NewTypeCommerceComponent implements OnInit {

  commerce: FormGroup;
  commerceModel = new TypeCommerce;
  button = 1;

  constructor(
    private _commerceService: CommerceService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private router : Router
  ) { 
    this.commerceForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  onSubmit(){
    const id = this._route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.createCommerce();
    } else {
      this.updateCommerce();
    }
  }

  createCommerce(){
    this.commerceModel.id = this.commerce.get('id').value;
    this.commerceModel.type = this.commerce.get('type').value;
    this._commerceService.createTypeCommerce( this.commerceModel )
    .subscribe( ( resp : any ) =>{
      Swal.fire(
        'Comercio Agregado',
        'Presiona OK',
        'success'
      );
      this.router.navigateByUrl('/lobby/list/type/commerce' );
    },
    (error) => {
      Swal.fire('Error!', error.error.error, 'error');
    }
  );
}

  updateCommerce(){
    this.commerceModel.id = this.commerce.get('id').value;
    this.commerceModel.type = this.commerce.get('type').value;
    this._commerceService.updateTypeCommerce( this.commerceModel )
    .subscribe( ( resp : any ) =>{
      Swal.fire(
        'Comercio Actualizado',
        'Presiona OK',
        'success'
      );
      this.router.navigateByUrl('/lobby/list/type/commerce' );
    },
    (error) => {
      Swal.fire('Error!', error.error.error, 'error');
    }
  );
}

  loadData() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.button = 2;

      this._commerceService
        .findTypeCommerceById( id )
        .subscribe( ( res: any ) => {

          this.commerce.controls['id'].setValue(res.data.id);
          this.commerce.controls['type'].setValue(res.data.type);

        });
    }
  }

  get invalidCommerce() {
    return (
      this.commerce.get('type').invalid &&
      this.commerce.get('type').touched
    );
  }

  commerceForm(){
    this.commerce = this._fb.group({
      id: [''],
      type: ['', [Validators.required]]
    });
  }

}
