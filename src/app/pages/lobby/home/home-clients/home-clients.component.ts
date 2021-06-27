import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commerce } from 'src/app/core/models/commerce.model';
import { Reserve } from 'src/app/core/models/Reserve.model';
import { TypeCommerce } from 'src/app/core/models/TypeCommerce.model';
import { CommerceService } from 'src/app/core/services/commerce/commerce.service';
import { OwnerService } from 'src/app/core/services/owner/owner.service';
import { ReserveService } from 'src/app/core/services/reserve/reserve.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-clients',
  templateUrl: './home-clients.component.html',
  styleUrls: ['./home-clients.component.css']
})
export class HomeClientsComponent implements OnInit {

  typeCommerce : TypeCommerce[];
  commerce : Commerce[];
  nameCommerce : any;

  hideCommerce : boolean = false;
  findCommerce : boolean = true;

  constructor(
    private _commerceService : CommerceService,
    private _ownerService : OwnerService,
    private _reserveService : ReserveService,
    private _route : Router
  ) { }

  ngOnInit(): void {
    this.getAllTypeCommerce();
  }

  seeCommerce(){
    this.findCommerce = true;
    this.hideCommerce = false;
  }
  getAllTypeCommerce(){
    this._commerceService.getAllTypeCommerce()
    .subscribe( ( resp : any ) => { 
      this.typeCommerce = resp.data;
    });
  }

  showCommerce( data : any ){
    this._commerceService.findCommerceByFk( data.id )
    .subscribe(
      ( res : any ) => {
        console.log(res.data);
        if ( res.data != '' ) {
          console.log(' existen comercios ');
          this.nameCommerce = data.type;
          this.hideCommerce = true;
          this.findCommerce = false;
          this.commerce = res.data;
        } else {
          Swal.fire("No hay comercios de tipo " + data.type);
        }

      }
    )
  }

  ownerName : any;
  commerceName : any;
  phoneCommerce : any;
  directionCommerce : any;
  reserveDataTemp : any;
  
  reserve( commerce : any ){
    console.log(commerce);

    this.reserveDataTemp = commerce;
    this.commerceName = commerce.name;
    this.phoneCommerce = commerce.description;
    this.directionCommerce = commerce.direction;
    
    this._ownerService.findOwnerById(commerce.owner_id)
    .subscribe(
      (response:any)=>{
        this.ownerName = response.data.name;
      }
    )
    
  }

  descriptionReserve : any;
  getDescription( description:any){
    this.descriptionReserve = description;
    
  }
  dateReserve : any;
  getDate( date:any){
    this.dateReserve = date;
    
  }

  timeReserve : any;
  getTime(time){
    this.timeReserve = time;
    
  }


  generateReserve(){
    let reserveModel = new Reserve();
    reserveModel.client_id = localStorage.getItem('id');
    reserveModel.commerce_id = this.reserveDataTemp.id;
    reserveModel.date = this.dateReserve;
    reserveModel.description = this.descriptionReserve;
    reserveModel.time = this.timeReserve;

    Swal.fire({
      title: 'Seguro que quieres reservar?',
      showCancelButton: true,
      confirmButtonText: `Reservar`,
      denyButtonText: `No`,
    }).then((result) => {
      this._reserveService.createReserve(reserveModel)
      .subscribe(
        (reserve:any)=>{
          // this._route.navigateByUrl('/lobby/list/reserve/client');
          
        }
      )
      if (result.isConfirmed) {
        Swal.fire('Hizo la reserva correctamente!', '', 'success')
      } 
    })
    
    // this.reserveModel.
  }



}
