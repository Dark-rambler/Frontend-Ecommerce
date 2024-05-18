import { Component } from '@angular/core';
import { StoreMannagerRoutingModule } from './store-mannager-routing.module';
import { Router } from '@angular/router';
import { StoreMannagerModule } from './store-mannager.module';

@Component({
  selector: 'app-store-mannager',
  templateUrl: './store-mannager.component.html',
  styleUrls: ['./store-mannager.component.scss'],
  standalone: true,
  imports: [StoreMannagerModule]
})
export default class StoreMannagerComponent {
  public items: any;
  private menuItems: Object = [ { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home' }, { label: 'Store', icon: 'pi pi-fw pi-shopping-cart', routerLink: '/store' }, { label: 'Store Mannager', icon: 'pi pi-fw pi-cog', routerLink: '/store-mannager' }];

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.items = this.menuItems;
  }

  public onLogoClick() {
    this.router.navigate(['/home']);
  }

}
