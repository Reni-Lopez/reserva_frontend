import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Client } from '../../models/Client.model';
import { Commerce } from '../../models/commerce.model';
import { TypeCommerce } from '../../models/TypeCommerce.model';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  Commerce : Commerce;
  typeCommerce : TypeCommerce;

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

  public getCommerceByOwner( id: any ): any {
    return this.http.get( this.baseUrl + '/getCommercebyowner/' + id, this.httpOptions );
  }

  public findTypeCommerceById( id: any ): any {
    return this.http.get( this.baseUrl + '/typecommerce/' + id, this.httpOptions );
  }
  public findCommerceByFk( id: any ): any {
    return this.http.get( this.baseUrl + '/commerce/' + id, this.httpOptions );
  }
  public findCommerceById( id: any ): any {
    return this.http.get( this.baseUrl + '/commerceId/' + id, this.httpOptions );
  }
  public getAllCommerce(){
    return this.http.get( this.baseUrl + '/commerce', this.httpOptions );
  }
  public getCommerce( id: any ): any {
    return this.http.get( this.baseUrl + '/getcommerce/' + id, this.httpOptions );
  }
  public getAllTypeCommerce(){
    return this.http.get( this.baseUrl + '/typecommerce', this.httpOptions );
  }

  public createCommerce( commerce : Commerce ){
    const json = JSON.stringify(commerce);
    const params = 'json=' + json;
    console.log(params);
    return this.http.post( this.baseUrl + '/commerce',params,this.httpOptions2 );
  }
  public updateCommerce(commerce : Commerce){
    const json = JSON.stringify(commerce);
    const params = 'json=' + json;
    return this.http.put( this.baseUrl + '/commerce/' + commerce.id, params, this.httpOptions2 );
  }
  public createTypeCommerce( commerce : TypeCommerce ){
    const json = JSON.stringify(commerce);
    const params = 'json=' + json;
    return this.http.post( this.baseUrl + '/typecommerce',params,this.httpOptions2 );
  }
  public updateTypeCommerce(commerce : TypeCommerce){
    const json = JSON.stringify(commerce);
    const params = 'json=' + json;
    return this.http.put( this.baseUrl + '/typecommerce/' + commerce.id, params, this.httpOptions2 );
  }
  public deleteTypeCommerce( id : number ){
    return this.http.delete( this.baseUrl + '/typecommerce/' + id, this.httpOptions );
  }
  public deleteCommerce( id : number ){
    return this.http.delete( this.baseUrl + '/commerce/' + id, this.httpOptions );
  }
}
