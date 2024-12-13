import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  errorMessage: string = "";
  categoryId: number | null = null;
  products: any[] = [];
  selectedProduct: any | null = null;
  createProductRequest: any ={
    name: "",
    description: "",
    price: 0.0,
    image_url: "",
    category_id: null
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['category_id'];
      if (!this.categoryId) {
        this.router.navigate(['/categories']);
        return;
      }
      console.log('Category ID:', this.categoryId);
      this.loadProducts();
    });
  }

  loadProducts(){
    this.productService.getAllProductsByCategoryId(this.categoryId!).subscribe({
      next: (response: any) => {
        console.log(response);
        this.products = response.content;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
      }
    })
  }

  selectProduct(product: any){
    this.selectedProduct={...product};
  }

  updateProduct(){
    const request: any = {
      name: this.selectedProduct.name,
      description: this.selectedProduct.description,
      price: this.selectedProduct.price,
      image_url: this.selectedProduct.image_url
    }
    this.productService.updateProductById(this.selectedProduct.id, request).subscribe({
      next: (response: any) => {
        console.log(response);
        this.loadProducts();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
      }
    })
  }

  deleteProduct(){
    this.productService.deleteProductById(this.selectedProduct.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.loadProducts();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
      }
    })
  }

  createProduct(){
    this.createProductRequest.category_id=this.categoryId;
    this.productService.createProduct(this.createProductRequest).subscribe({
      next: (response: any) => {
        console.log(response);
        this.loadProducts();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
      }
    })
  }
}

