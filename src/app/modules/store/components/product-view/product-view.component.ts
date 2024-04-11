import { Component } from '@angular/core';
import { ProductViewService } from '../../services/product-view.service';
import { Product } from 'src/app/core/model/product';
import { InventoryStatus } from 'src/app/core/enums/InventoryStatus';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {
  public products : Product[] = [];
  public InventoryStatus = InventoryStatus;

   constructor(public productViewService: ProductViewService) {}
  ngOnInit(): void {
    this.productViewService.findAll().subscribe((products) => (this.products = products))
  }

  getSeverity (product: Product) {
    switch (product.inventoryStatus) {
        case InventoryStatus.INSTOCK:
            return "success";

        case InventoryStatus.LOWSTOCK:
            return "warning";

        case InventoryStatus.OUTOFSTOCK:
            return "danger";

        default:
          console.log(product.inventoryStatus);

            return "success";
    }
};

}
