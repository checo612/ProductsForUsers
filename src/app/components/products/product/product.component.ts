import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { Product } from '../../../models/product';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {

  constructor(private productService: ProductService, private toastr: ToastrService) { }
  @Input() productChild: Product; // La variable product va ser recibida desde el padre

  ngOnInit() {
    this.productChild = new Product(); // product se inicializa como producto para tenga valores null y no marque errores
    this.productService.getProducts();
    this.resetForm();
  }

  ngOnChanges() {

  }

  onSubmit(productForm: NgForm) { // Aqui se sube el formulario que esa en html
    if (productForm.value.key == null) {
    this.productService.insertProduct(productForm.value); // Accedo mi servicio para insertar productos y el .value es para ver el contenido
    } else {
      this.editProduct(productForm);
    }
    this.resetForm(productForm);
    this.toastr.success('Succes Operation', 'Product was inserted');
  }

  editProduct(productForm: NgForm) {
    this.productService.updateProduct(productForm.value);
      this.resetForm(productForm);
  }

  resetForm(productForm ?: NgForm) {
    if (productForm != null) {
      productForm.reset();
     this.productChild = new Product();
    }
  }
}
