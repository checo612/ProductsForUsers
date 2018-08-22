import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '../../../../node_modules/@angular/router';
import { UserAccount } from '../../models/users';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '../../../../node_modules/angularfire2/auth';
import { Observable } from '../../../../node_modules/rxjs';
import { User as firebaseUser } from 'firebase';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: []
})
export class LoginComponent implements OnInit {
  public error: string;
  public user: UserAccount;
  public userObservable: Observable<firebaseUser>;

  constructor(private authService: AuthService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.user = new UserAccount();
  }

  signThisUser() {
    this.authService
      .signUser(this.user.email, this.user.password)
      .then(() => {
        this.authService.authUser.subscribe((user) => { // nos suscribimos para conseguir el uid para la ruta.
          console.log('login' , user);
          this._router.navigate([`/home`]);
        });
      })
      .catch((err) => {
        console.log(err);
        this.error = err.message;
        this.toastr.error(this.error);
      });
  }

}


// Para navegar en las rutas
// ==================================================================================================================
// signThisUser() {
//   this.authService
//     .signUser(this.user.email, this.user.password)
//     .then(() => {
//       this.authService.authUser.subscribe((user) => { // nos suscribimos para conseguir el uid para la ruta.
//         this._router.navigate([`/home/${user.uid}`]);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       this.error = err.message;
//       this.toastr.error(this.error);
//     });
// }
// ==================================================================================================================
