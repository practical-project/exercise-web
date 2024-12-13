import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  errorMessage: string = "";
  categories: any[] = [];
  selectedCategory: any | null = null;
  createCategoryRequest: any ={
    name: "",
    description: ""
  }

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        console.log(response);
        this.categories = response.content;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
      }
    })
  }

  selectCategory(category: any){
    this.selectedCategory={...category};
  }

  updateCategory(){
    const request: any = {
      name: this.selectedCategory.name,
      description: this.selectedCategory.description
    }
    this.categoryService.updateCategoryById(this.selectedCategory.id, request).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getAllCategories();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
      }
    })
  }

  deleteCategory(){
    this.categoryService.deleteCategoryById(this.selectedCategory.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getAllCategories();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
      }
    })
  }

  createCategory(){
    this.categoryService.createCategory(this.createCategoryRequest).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getAllCategories();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
      }
    })
  }

  toProductComponent(category: any){
    this.router.navigate(['/products'], { queryParams: { category_id: category.id } });
  }
}
