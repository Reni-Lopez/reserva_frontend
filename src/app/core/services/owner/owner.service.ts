import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Client } from '../../models/Client.model';
import { Owner } from '../../models/Owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  owner : Owner;

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

  list : Client[];
  
  public getClientOfCommerce( id : any ) : Promise<any> {
    return this.http.get( this.baseUrl + '/clients/' + id, this.httpOptions )
    .toPromise().then( 
      ( res : any ) => {
        return res
      }
    );
  }
  
  login( owner: Owner ): any {
    const json = JSON.stringify( owner );
    const params = 'json=' + json;
    return this.http.post(this.baseUrl + '/auth/login/owner', params, this.httpOptions2).pipe(
      map(( res: any ) => {
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
  isOwner(): any {
    const role = localStorage.getItem('role');
    if ( role === '2' )
      return true;
    else
      return false;
    
  }

  public getAllOwner(){
    return this.http.get( this.baseUrl + '/owner', this.httpOptions );
  }
  public findOwnerById( id: any ): any {
    return this.http.get( this.baseUrl + '/owner/' + id, this.httpOptions );
  }
  public createOwner( owner : Owner ){
    const json = JSON.stringify( owner );
    const params = 'json=' + json;
    return this.http.post( this.baseUrl + '/owner',params,this.httpOptions2 );
  }
  public updateOwner( owner : Owner ){
    const json = JSON.stringify( owner );
    const params = 'json=' + json;
    return this.http.put( this.baseUrl + '/owner/' + owner.id, params, this.httpOptions2 );
  }
  public deleteOwner( id : number ){
    return this.http.delete( this.baseUrl + '/owner/' + id, this.httpOptions );
  }
}