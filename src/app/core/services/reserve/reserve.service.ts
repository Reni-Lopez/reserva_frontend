import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Reserve } from '../../models/Reserve.model'
@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  baseUrl = environment.apiUrl;

  constructor( private http: HttpClient  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      // authorization: 'bearer ' + localStorage.getItem('token'),
      'content-type': 'application/json',
    }),
  };

  httpOptions2 = {
    headers: new HttpHeaders({
      // authorization: 'bearer ' + localStorage.getItem('token'),
      'content-type': 'application/x-www-form-urlencoded',
    }),
  };

  public getReserveByIdClient( id: any ): any {
    return this.http.get( this.baseUrl + '/getReserveByIdClient/' + id, this.httpOptions );
  }

  public getReserveByIdOwner( id: any ): any {
    return this.http.get( this.baseUrl + '/getReserveByIdOwner/' + id, this.httpOptions );
  }

  public createReserve( reserve : Reserve ){
    const json = JSON.stringify(reserve);
    const params = 'json=' + json;
    console.log(params);
    return this.http.post( this.baseUrl + '/reserve',params,this.httpOptions2 );
  }

}
