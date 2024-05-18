import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/app/core/enviroments/enviroment.development';
import { Product } from 'src/app/core/model/product';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class StoreMannagerService extends HttpService<Product>{

  @Output() trigger: EventEmitter<any> = new EventEmitter();

  constructor(protected override http: HttpClient){
    super(http, `${environment.storeUrl}/products`)
   }
}
