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
  private menuItems: Object = [];

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.items = this.menuItems;
  }

  public onLogoClick() {
    this.router.navigate(['/home']);
  }
}
