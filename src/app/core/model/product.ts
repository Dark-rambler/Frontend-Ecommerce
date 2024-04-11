import { InventoryStatus } from "../enums/InventoryStatus";
import { Base } from "./base";

export class Product extends Base{
    id: number = 0;
    name: string = '';
    description: string = '';
    price: number = 0;
    imageUrl: string = '';
    categoryId: number = 0;
    stock: number = 0;
    inventoryStatus: InventoryStatus = InventoryStatus.INSTOCK;
}
