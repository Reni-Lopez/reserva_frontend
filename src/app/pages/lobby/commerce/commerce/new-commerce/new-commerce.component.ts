import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Commerce } from 'src/app/core/models/commerce.model';
import { CommerceService } from 'src/app/core/services/commerce/commerce.service';
import { OwnerService } from 'src/app/core/services/owner/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-commerce',
  templateUrl: './new-commerce.component.html',
  styleUrls: ['./new-commerce.component.css']
})
export class NewCommerceComponent implements OnInit {

  commerce: FormGroup;
  commerceModel = new Commerce;
  button = 1;
  typeOfCommerce : any;
  commerceSelected : any;
  owner : any;
  ownerSelected : any;

  hour : boolean = true;

  constructor(
    private _commerceService: CommerceService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private router : Router,
    private _ownerService : OwnerService
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
  selectCommerce(){
    this.commerceSelected = this.commerce.get('type_commerce').value;
  }
  selectOwner(){
    this.ownerSelected = this.commerce.get('owner_id').value;
  }
  createCommerce(){
    this.commerceModel.id = this.commerce.get('id').value;
    this.commerceModel.type_commerce = this.commerceSelected;
    this.commerceModel.owner_id = this.ownerSelected;
    this.commerceModel.name = this.commerce.get('name').value;
    this.commerceModel.description = this.commerce.get('description').value;
    this.commerceModel.opening = this.commerce.get('opening').value;
    this.commerceModel.closing = this.commerce.get('closing').value;
    this.commerceModel.direction = this.commerce.get('direction').value;

    if (this.validateHour(this.commerce.get('opening').value,this.commerce.get('closing').value)) {
        this._commerceService.createCommerce( this.commerceModel )
        .subscribe(
            ( resp : any) => {
              Swal.fire(
                'Comercio Creado',
                'Presiona OK',
                'success'
              );
              this.router.navigateByUrl('/lobby/list/commerce' );
            },
            (error) => {
              Swal.fire('Error!', error.error.error, 'error');
            }
          );
    }
  }
  updateCommerce(){
    this.commerceModel.id = this.commerce.get('id').value;
    this.commerceModel.type_commerce = this.ownerSelected;
    this.commerceModel.owner_id = this.commerceSelected;
    this.commerceModel.name = this.commerce.get('name').value;
    this.commerceModel.description = this.commerce.get('description').value;
    this.commerceModel.opening = this.commerce.get('opening').value;
    this.commerceModel.closing = this.commerce.get('closing').value;
    this.commerceModel.direction = this.commerce.get('direction').value;
    
    if (this.validateHour(this.commerce.get('opening').value,this.commerce.get('closing').value)) {
    this._commerceService.updateCommerce( this.commerceModel )
    .subscribe(
      ( resp : any) => {
        Swal.fire(
          'Comercio Actualizado',
          'Presiona OK',
          'success'
        );
        this.router.navigateByUrl('/lobby/list/commerce' );
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
    }
  }
  
  loadData() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.button = 2;

      this._commerceService
        .findCommerceById( id )
        .subscribe( ( resp: any ) => {
          
          this.commerce.controls['id'].setValue(resp.data.id);
          this.commerce.controls['name'].setValue(resp.data.name);
          this.commerce.controls['description'].setValue(resp.data.description);
          this.commerce.controls['opening'].setValue(resp.data.opening);
          this.commerce.controls['closing'].setValue(resp.data.closing);
          this.commerce.controls['direction'].setValue(resp.data.direction);

          this._commerceService.getAllTypeCommerce()
          .subscribe( ( resp : any ) =>{
            this.typeOfCommerce = resp.data;
          });
          this._ownerService.getAllOwner()
          .subscribe( ( resp : any ) =>{
            this.owner = resp.data;
          })


        });
    }else{
      this._commerceService.getAllTypeCommerce()
          .subscribe( ( resp : any ) =>{
            this.typeOfCommerce = resp.data;
          });
          this._ownerService.getAllOwner()
          .subscribe( ( resp : any ) =>{
            this.owner = resp.data;
          })
    }
  }

  validateHour( hour1 : any, hour2 : any) : boolean {
    console.log(this.commerce.get('opening').value,this.commerce.get('closing').value);
    if (hour1 < hour2) {
      console.log('segunda mayor');
      return this.hour = true;
    } else {
      console.log('primera mayor');
      return this.hour = false;
    }
  }
  get invalidName() {
    return (
      this.commerce.get('name').invalid &&
      this.commerce.get('name').touched
    );
  }
  get invalidDirection() {
    return (
      this.commerce.get('direction').invalid &&
      this.commerce.get('direction').touched
    );
  }
  get invaliOpening() {
    return (
      this.commerce.get('opening').invalid &&
      this.commerce.get('opening').touched
    );
  }
  get invaliClosing() {
    return (
      this.commerce.get('closing').invalid &&
      this.commerce.get('closing').touched
    );
  }
  get invaliDescription() {
    return (
      this.commerce.get('description').invalid &&
      this.commerce.get('description').touched
    );
  }

  commerceForm(){
    this.commerce = this._fb.group({
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

