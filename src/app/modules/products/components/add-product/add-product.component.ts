import { IProduct } from 'src/app/models';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  formTitle: string = 'Add';
  productId: string;
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    image: new FormControl('', [Validators.required])
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productSrv: ProductsService 
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.productId = p['id'] || null;
      this.formTitle = this.productId ? 'Update' : "Add";

      if(this.productId) {
        this.prepopulateProduct(+this.productId);
      }
    })
  }

  prepopulateProduct(id: number) {
    this.productSrv.getProductInfoById(id).subscribe(productInfo => {
      if(productInfo) {
        this.productForm.setValue({
          name: productInfo.name,
          image: productInfo.image,
          price: productInfo.price,
          description: productInfo.description
        });
      }
    });

  }

  addProduct() {
    console.log('Product Info:: ', this.productForm.value);
    const { name, image, description, price } = this.productForm.value;
    const product: IProduct = {
      id: 123, // generate random
      name,
      image,
      description,
      price,
      available: true
    }
    this.productSrv.addProduct(product).subscribe(res => {
      console.log("Product added successfully");
      this.router.navigate(['', 'products', 'manage']);
    }, err => {
      console.log("failed to add");
    })
    
  }

}
