import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '', redirectTo: 'expenses', pathMatch: 'full'
},
{
  path: 'expenses',
  loadComponent: () => import('./modules/expenses/expenses.component')
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
