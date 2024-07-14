import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseTrackerPageRoutingModule } from './expense-tracker-routing.module';

import { ExpenseTrackerPage } from './expense-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseTrackerPageRoutingModule
  ],
  declarations: [ExpenseTrackerPage]
})
export class ExpenseTrackerPageModule {}
