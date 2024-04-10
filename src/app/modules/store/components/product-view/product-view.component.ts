import { Component } from '@angular/core';
import { ProductViewService } from '../../services/product-view.service';
import { Product } from 'src/app/core/model/product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {
   public products : Product[] = [];
   constructor(public productViewService: ProductViewService) {}
  ngOnInit(): void {
    this.productViewService.findAll().subscribe((products) => (this.products = products))
  }

}
