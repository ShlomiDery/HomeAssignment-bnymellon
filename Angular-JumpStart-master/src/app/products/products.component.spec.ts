import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { AppModule } from "../app.module";
import { DataService } from '../core/services/data.service';
import { LoggerService } from '../core/services/logger.service';
import { FilterService } from '../core/services/filter.service';
import { IProduct } from '../shared/interfaces';
describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[AppModule],
      declarations: [ ProductsComponent ],
      providers:[DataService,LoggerService,FilterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cartChange receive empty array and return length 1', () => {
    component.productsCart=[];
    let product:IProduct={productName:"a",itemCost:1,productId:123};
    component.cartChanged([product,2]);
    expect(component.productsCart.length==1).toBeTruthy();
  });

  it('filterChange receive 2 products and return 1 product after filter', () => {
    component.products=[
      {productName:"a",itemCost:1,productId:123},
      {productName:"b",itemCost:1,productId:123}
    ]
    let data='b';
    component.filteredProducts=component.products;
    component.filterChanged(data);
    expect(component.filteredProducts.length==1).toBeTruthy();
  });


});
