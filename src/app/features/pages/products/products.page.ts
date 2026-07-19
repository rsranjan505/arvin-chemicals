import { Component } from '@angular/core';
import { ProductListsComponent } from '../components/product-lists/product-lists.component';

@Component({
  selector: 'app-products',
  imports: [ProductListsComponent],
  templateUrl: './products.page.html',
  styleUrl: './products.page.css'
})
export class ProductsPage {

}
