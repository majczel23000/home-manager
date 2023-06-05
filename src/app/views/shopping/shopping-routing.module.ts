import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingDashboardComponent } from './shopping-dashboard/shopping-dashboard.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingDashboardComponent,
  },
  {
    path: ':id',
    component: ShoppingListDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
