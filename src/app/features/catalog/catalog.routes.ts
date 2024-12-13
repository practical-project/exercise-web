import { Routes } from "@angular/router";
import { ProductsComponent } from "./components/products/products.component";
import { CategoriesComponent } from "./components/categories/categories.component";

export const CATALOG_ROUTES: Routes = [
    { path: '', redirectTo: 'categories', pathMatch: 'full'},
    { path: 'categories', component: CategoriesComponent },
    { path: 'products', component: ProductsComponent }
];
