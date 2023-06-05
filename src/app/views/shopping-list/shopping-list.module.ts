import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListItemComponent } from './shopping-list-item/shopping-list-item.component';
import { ShoppingListSingleElementComponent } from './shopping-list-single-element/shopping-list-single-element.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingListAddComponent } from './shopping-list-add/shopping-list-add.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrentLocationModule } from '../current-location/current-location.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListItemComponent,
    ShoppingListSingleElementComponent,
    ShoppingListAddComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CurrentLocationModule,
    MatSelectModule,
  ],
})
export class ShoppingListModule { }
