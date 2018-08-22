import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '../../../../node_modules/angularfire2/database';
import { map } from 'rxjs/operators';

const lista = 'users'; // nombre de la lista

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public userList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {
    this.userList = this.firebase.list('users'); // nombre de la lista en la base de datos
  }

  insertUser(user, name) {
    if (user) {
      return this.firebase.object(`users`).set({
        // se conecta a la base de datos y crea una lista dependiendo del contenido de 'lista'.
        key: user.uid,
        email: user.email,
        name: name
      });
    }

  }
  getUsers() {
    return this.userList.snapshotChanges().pipe(
      map(changes => // el map te hace un mapeo de todos los productos desde el primer nodo de la lista de usuarios
        changes.map(c => ({ // el map te hace un mapeo de todos los productos a partir del segundo nodo
          key: c.payload.key, // payload accede al contenido de las variables
          ...c.payload.val()
        }))
      ));
  }

  getProductsById(key) {
    return this.firebase.object('products/' + key);
  }
  // Traer el usuario por el id: Opcion 1
  getUserById(uid) {
    return this.firebase.object(`${lista}/${uid}`).snapshotChanges().pipe(
      map(changes => { // el map te hace un mapeo de todos los usuarios desde y busca el id de cada uno
        return {
          key: changes.key, // payload accede al contenido de las variables
       ...changes.payload.val()
        };
      }));

  }


  // Traer el usuario por el id: Opcion 2
  getUsuario(uid: string) {
    if (uid) {
      return this.firebase.object(`${lista}/${uid}`).valueChanges();
    }
  }
}

// Mape las letras si no hay objetos.
// =============================================================================================
// getUserById(uid) {
//   return this.firebase.list(`${lista}/${uid}`).snapshotChanges().pipe(
//       map(changes => { // el map te hace un mapeo de todos los productos desde el primer nodo de la lista de usuarios
//       return changes.map(c => { // el map te hace un mapeo de todos los productos a partir del segundo nodo
//     return {key: c.key, // payload accede al contenido de las variables
//     ...c.payload.val() };
//   });
// }
// ));
// }

// Para mandar datos especificos de la base de datos.
// ===============================================================================================
// var1:any;
//   // Traer el usuario por el id: Opcion 1
//   getUserById(uid) {
//     return this.firebase.object(`${lista}/${uid}`).snapshotChanges().pipe(
//       map(changes => { // el map te hace un mapeo de todos los usuarios desde y busca el id de cada uno
//        this.var1 = changes.payload.val();
//         console.log('kkkkkkkkk' + this.var1.name);
//         return {
//           key: changes.key, // payload accede al contenido de las variables
//          name: this.var1.name,
//          email: this.var1.email
//           // ...changes.payload.val()
//         };
//       }));

//   }
