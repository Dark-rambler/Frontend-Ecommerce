import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/enviroments/enviroment.development';
import { Product } from 'src/app/core/model/product';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductViewService extends HttpService<Product> {

  constructor(protected override http: HttpClient){
    super(http, `${environment.storeUrl}/products`)
   }
}
