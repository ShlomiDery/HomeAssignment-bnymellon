import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { OrdersAddComponent } from './orders-add/orders-add.component';
import { ProductsComponent } from '../products/products.component';
import { ProductComponent } from '../product/product.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [SharedModule, OrdersRoutingModule,MatSelectModule],
  declarations: [OrdersRoutingModule.components, OrdersDetailsComponent, OrdersAddComponent,ProductsComponent,ProductComponent]
})
export class OrdersModule { }
