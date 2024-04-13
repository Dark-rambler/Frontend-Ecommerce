import { Component } from '@angular/core';
import { StoreMannagerRoutingModule } from './store-mannager-routing.module';

@Component({
  selector: 'app-store-mannager',
  templateUrl: './store-mannager.component.html',
  styleUrls: ['./store-mannager.component.scss'],
  standalone: true,
  imports: [StoreMannagerRoutingModule]
})
export default class StoreMannagerComponent {

}
