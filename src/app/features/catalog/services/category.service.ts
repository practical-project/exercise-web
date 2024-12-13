import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../../core/config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCategories(){
    let URL = URL_SERVICIOS + "/categories";
    return this.httpClient.get<any>(URL)
  }

  getCategoryById(categoryId: number){
    let URL = URL_SERVICIOS + "/categories/" + categoryId;
    return this.httpClient.get<any>(URL)
  }

  getCategoryByName(categoryName: number){
    let URL = URL_SERVICIOS + "/categories/name/" + categoryName;
    return this.httpClient.get<any>(URL)
  }

  createCategory(request: any) {
    let URL = URL_SERVICIOS + "/categories";
    return this.httpClient.post<any>(URL, request)
  }

  updateCategoryById(categoryId: number, request: any) {
    let URL = URL_SERVICIOS + "/categories/" + categoryId;
    return this.httpClient.put<any>(URL, request)
  }

  deleteCategoryById(categoryId: number) {
    let URL = URL_SERVICIOS + "/categories/" + categoryId;
    return this.httpClient.delete<boolean>(URL)
  }
}
