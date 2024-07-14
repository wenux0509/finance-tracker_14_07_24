import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseTrackerPage } from './expense-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseTrackerPageRoutingModule {}
