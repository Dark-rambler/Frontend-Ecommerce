import { Component } from '@angular/core';
import { Product } from 'src/app/core/model/product';
import { StoreMannagerService } from '../../services/store-mannager.service';
import { InventoryStatus } from 'src/app/core/enums/InventoryStatus';
import { labels } from 'src/app/core/constants/labels';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  products!: Product[];
  public lables = labels;
  selectedProduct!: Product;
  public cols = [
    { field: 'name', header: labels.name },
    { field: 'image', header: labels.image },
    { field: 'price', header: labels.price },
    { field: 'category', header: labels.category },
    { field: 'reviews', header: labels.reviews },
    { field: 'inventoryStatus', header: labels.inventoryStatus },
  ];

    constructor(private storeMannagerService: StoreMannagerService ) {}

    ngOnInit() {
        this.storeMannagerService.findAll().subscribe((products) => (this.products = products));
    }

    public onRowSelect(event:any) {
      this.sendSelectedProduct(event.data);
    }
    public onRowUnselect(event:any) {
      this.sendSelectedProduct(null);
    }

    public getSeverity(product: Product) {
      switch (product.inventoryStatus) {
        case InventoryStatus.INSTOCK:
          return "success";

        case InventoryStatus.LOWSTOCK:
          return "warning";

        case InventoryStatus.OUTOFSTOCK:
          return "danger";

        default:
          return "success";
      }
    };
    private sendSelectedProduct(product: any) {
      this.storeMannagerService.setSelectedData(product);
    }
}
