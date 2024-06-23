import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '', redirectTo: 'expenses', pathMatch: 'full'
},
{
  path: 'expenses',
  loadComponent: () => import('./modules/expenses/expenses.component')
},
{
  path: 'document-types',
  loadComponent: () => import('./modules/document-types/document-types.component')
},
{
  path : 'incomes',
  loadComponent: () => import('./modules/incomes/incomes.component')
},
{
  path: 'reports',
  loadComponent: () => import('./modules/reports/reports.component')
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
