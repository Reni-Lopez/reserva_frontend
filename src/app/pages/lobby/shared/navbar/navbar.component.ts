import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import { OwnerService } from 'src/app/core/services/owner/owner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  idUser : any;
  
  isAdmin: boolean = this._authService.isAdmin();
  isOwner: boolean = this._ownerService.isOwner();
  isClient: boolean = this._clientService.isClient();

  userName : any;
  constructor(
    private _authService : AuthService,
    private _ownerService : OwnerService,
    private _clientService : ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('name');
    this.idUser = localStorage.getItem('id');
  }

  logout(){
    this._authService.logout();
    this.router.navigateByUrl('/login/clients' );
  }
  
}
