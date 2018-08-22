import { Injectable } from '@angular/core';
// clase
import { Product} from '../../models/product';
// Firebase
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
// Maps
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  public productList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {
    this.productList = this.firebase.list('products');
   }

// aqui se crea una lista en la base de datos cuyo nombre sera products y cuando este creada solamente la traera
  getProducts() {
   return this.productList.snapshotChanges().pipe(
        map(changes => // el map te hace un mapeo de todos los productos desde el primer nodo de la lista de productos
          changes.map(c => ({ // el map te hace un mapeo de todos los productos a partir del segundo nodo
        key: c.payload.key, // payload accede al contenido de las variables
        ...c.payload.val()
      }))
    ));
    }

  getProductsById(key) {
    return this.firebase.object('products/' + key);
  }

  insertProduct( product: Product) {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  updateProduct(product: Product) {
    this.productList.update(product.key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });

  }

  deleteProduct(key: string ) {
    this.productList.remove(key);
  }
}

// <<<<<<Inserta variables tipo producto en tu base de datos>>>>>>
// =============================================================
// Usando map y pipes

// constructor(private firebase: AngularFireDatabase) {
// this.productList = this.firebase.list('products');
// }
//
// getProducts() {
  //   return this.productList.snapshotChanges().pipe(
  //     map(changes => changes.map(c => ({
  //     key: c.payload.key,
  //     ...c.payload.val()
  //   }))
  // ));
  // }
// =============================================================
// Enviando la base de datos directo
// constructor(private firebase: AngularFireDatabase) {
// }

// getProducts() {
//  return this.productList = this.firebase.list('products');
// }
