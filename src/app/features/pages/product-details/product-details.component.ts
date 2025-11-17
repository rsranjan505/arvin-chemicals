import { Component } from '@angular/core';
import { ItemDetailsComponent } from '../components/item-details/item-details.component';

@Component({
  selector: 'app-product-details',
  imports: [ItemDetailsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

}
