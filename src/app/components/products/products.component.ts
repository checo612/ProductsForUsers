import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productDad: Product;
  constructor() { }

  ngOnInit() {
  }

  setDataFromChild(data) {
    this.productDad = Object.assign({}, data);
    console.log('Parent' + data);
  }
}
