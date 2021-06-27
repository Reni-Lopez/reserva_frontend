import { Component, OnInit } from '@angular/core';
import { ReserveService } from 'src/app/core/services/reserve/reserve.service';

@Component({
  selector: 'app-list-reserve-client',
  templateUrl: './list-reserve-client.component.html',
  styleUrls: ['./list-reserve-client.component.css']
})
export class ListReserveClientComponent implements OnInit {

  reserves : any[];
  load = false;

  constructor(
    private _reserveService : ReserveService
  ) { 
    this.load = true;
    this._reserveService.getReserveByIdClient( localStorage.getItem('id') )
    .subscribe(
      (response:any)=>{
        this.reserves = response.data;

          this.load = false;

        console.log(response);
        
      }
    )
  }

  ngOnInit(): void {
  }

}
