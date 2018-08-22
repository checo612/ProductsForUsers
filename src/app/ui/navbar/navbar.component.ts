import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  uid: string;

  constructor( private auth: AuthService) { }

  ngOnInit() {
  }

 closeSession() {
   this.auth.closeAccount();
 }


}
