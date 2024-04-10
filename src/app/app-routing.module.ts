import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '', redirectTo: 'store', pathMatch: 'full'
},
{
  path: 'store',
  loadComponent: () => import('./modules/store/store.component')}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
