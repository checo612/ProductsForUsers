import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UsersService } from '../../services/users/users.service';
import { UserAccount } from '../../models/users';
import { User, auth } from '../../../../node_modules/firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: UserAccount[];
  uid: string;
  myUser: UserAccount;
  usuario: UserAccount;
  loading = true;
  constructor(private authService: AuthService, private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((u: UserAccount[]) => {
      this.users = u;
      console.log(this.users);
    });
    this.uid = this.authService.uid;
    this.userService.getUserById(this.uid).subscribe((user: any) => {
      if (user) {
      this.myUser = user;
      this.loading = false;
     }});
  }

  // getMyUser() {
  //   this.userService.getUserById(this.uid).subscribe((x: any) => {
  //     this.myUser = x;
  //     console.log(this.uid, 'resultado', this.myUser.name, this.myUser.email);
  //   });

  // }

}
