import { Component, OnInit, Output } from '@angular/core';
// service
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../models/product';
import { map } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];
  loading = true;
  showfunctions = true;
  @Output('productEvent') productEvent: EventEmitter<Product> = new EventEmitter();


  constructor(private productService: ProductService, private toastr: ToastrService) { }
  ngOnInit() {
     this.productService.getProducts().subscribe((p: Product[]) => {
      this.productList = p;
      this.loading = false;
    });
  }


  editProduct(product: Product) {
    this.productEvent.emit(product);

    // this.productService.selectedProduct = Object.assign({}, product);
     // En el ngmodel de product.component.html se puso como contenido el selectedProduct esto se hace para que el usuario
     // ya tenga lo que va modificar en el formulario.
     // Object.assign ({}, product) hace una copia del producto como un objeto aparte para que no modifique en el momento
  }

  deleteProduct(key: string) {
    if (confirm('Are you sure you want to delete it?')) {
    this.productService.deleteProduct(key);
    this.toastr.success('Succes Operation', 'Product was deleted'); }
  }

}

// <<<<<Para mostrar todas las listas de la base de datos>>>>>
// ======================================================================================================
// Manera de daniela: le dices que 'p' sera un tipo producto para evitar conflictos con el tipado y se
// llama directamente como una lista de firebase desde el servicio products.

// ngOnInit() {
//   console.log(this.productList);
//    this.productService.getProducts().valueChanges().subscribe((p: Product[]) => {
//     console.log(p);
//     this.productList = p;
//     this.loading = false; //Desactiva el loading
//
//   });
// ======================================================================================================
// Usando map y pipes en el servicio.

// ngOnInit() {
// this.productService.getProducts().subscribe(p => {
//   console.log(p);
//   this.productList = p;
// });
