import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../../core/config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProducts(){
    let URL = URL_SERVICIOS + "/products";
    return this.httpClient.get<any>(URL)
  }

  getAllProductsByCategoryId(categoryId: number){
    let URL = URL_SERVICIOS + "/products/category/" + categoryId;
    return this.httpClient.get<any>(URL)
  }

  getProductById(productId: number){
    let URL = URL_SERVICIOS + "/products/" + productId;
    return this.httpClient.get<any>(URL)
  }

  getProductByName(productName: number){
    let URL = URL_SERVICIOS + "/products/name/" + productName;
    return this.httpClient.get<any>(URL)
  }

  createProduct(request: any) {
    let URL = URL_SERVICIOS + "/products";
    return this.httpClient.post<any>(URL, request)
  }

  updateProductById(productId: number, request: any) {
    let URL = URL_SERVICIOS + "/products/" + productId;
    return this.httpClient.put<any>(URL, request)
  }

  deleteProductById(productId: number) {
    let URL = URL_SERVICIOS + "/products/" + productId;
    return this.httpClient.delete<boolean>(URL)
  }
}
