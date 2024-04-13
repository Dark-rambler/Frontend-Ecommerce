import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimeModule } from 'src/app/prime.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, PrimeModule]
})
export class HeaderComponent implements OnInit {
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
