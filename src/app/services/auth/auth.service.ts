import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from '../users/users.service';
import { User as firebaseUser } from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  public authUser: Observable<firebaseUser>;
  public uid: string;

  constructor(private fireAuth: AngularFireAuth, private router: Router, private usersService: UsersService) {
    this.authUser = this.fireAuth.authState;
    this.authUser.subscribe(user => {
      if (user) {
        this.uid = user.uid; // Desde aqui se agarra el id del usuario
      }
    });
  }

  createUser(email: string, password: string, name: string) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser: firebase.auth.UserCredential) => {
      return this.usersService.insertUser(newUser.user, name);
    }); // crea un usuario y en el then guarda ese usuario en una lista de usuarios en la base de datos.
  }

  signUser(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  closeAccount() {
    this.fireAuth.auth.signOut();
    this.router.navigate(['login']);
    delete this.uid;
  }

  // getUserId() {
  //   return this.authUser.subscribe(userToGet => {
  //     this.uid = userToGet.uid;
  //   });
  // }


  canActivate() {
    return this.authUser.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(err => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
