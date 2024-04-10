import { Component } from '@angular/core';
import { StoreModule } from './store.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  standalone: true,
  imports: [StoreModule, CommonModule]
})
export default class StoreComponent {

}
