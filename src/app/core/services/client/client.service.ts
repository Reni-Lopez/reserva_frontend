import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Client } from '../../models/Client.model';
import { ClientCommerce } from '../../models/ClientCommerce.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client : Client;

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient 
  ) { }

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

  login( client : Client ): any {
    const json = JSON.stringify( client );
    const params = 'json=' + json;
    console.log(params);
    return this.http.post(this.baseUrl + '/auth/login/client', params, this.httpOptions2).pipe(
      map(( res: any ) => {
        console.log( res ); 
        this.saveStorage( res.data.id, res.data.role, res.data.name, res.data.email );
      })
    );
  }
  saveStorage( id: string, role: string, name: string, email: string ): void {
    localStorage.setItem('id', id );
    localStorage.setItem('role', role);
    localStorage.setItem('name', name );
    localStorage.setItem('email', email );
  }
  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem( 'name' );
    localStorage.removeItem( 'email' );
    localStorage.removeItem( 'role' );
    localStorage.removeItem( 'id');
  }
  isClient(): any {
    const role = localStorage.getItem('role');
    if ( role === '3' )
      return true;
    else
      return false;
    
  }

  public getAllClient() : Promise<any> {
    return this.http.get( this.baseUrl + '/client', this.httpOptions )
    .toPromise().then( 
      ( res : any ) => {
        console.log(res);
        return res
      }
    );
  }

  public findClientById( id: any ): any {
    return this.http.get( this.baseUrl + '/client/' + id, this.httpOptions );
  }
  public createClientCommerce( client : ClientCommerce ){
    const json = JSON.stringify( client );
    const params = 'json=' + json;
    return this.http.post( this.baseUrl + '/clientcommerce',params,this.httpOptions2 );
  }
  public createCLient( client : Client ){
    const json = JSON.stringify( client );
    const params = 'json=' + json;
    return this.http.post( this.baseUrl + '/client',params,this.httpOptions2 );
  }
  public updateClient( client : Client ){
    const json = JSON.stringify( client );
    const params = 'json=' + json;
    return this.http.put( this.baseUrl + '/client/' + client.id, params, this.httpOptions2 );
  }
  public deleteClient( id : number ){
    return this.http.delete( this.baseUrl + '/client/' + id, this.httpOptions );
  }
}

