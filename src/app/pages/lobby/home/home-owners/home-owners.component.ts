import { Component, OnInit } from '@angular/core';
import { ReserveService } from 'src/app/core/services/reserve/reserve.service';

@Component({
  selector: 'app-home-owners',
  templateUrl: './home-owners.component.html',
  styleUrls: ['./home-owners.component.css']
})
export class HomeOwnersComponent implements OnInit {

  reserves : any;
  load = false;

  constructor(
    private _reserveService : ReserveService
  ) {
    this.load = true;
  }

  ngOnInit(): void {
    this.getReserveByIdOwner( );
  }

  getReserveByIdOwner( ){
    this._reserveService.getReserveByIdOwner( localStorage.getItem('id'))
    .subscribe(
      (response:any)=>{
        this.reserves = response.data; 
        this.load = false;
        console.log(response);
        
      }
    )
  }

}
