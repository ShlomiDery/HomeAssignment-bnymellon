import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { IProduct } from '../shared/interfaces';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product={productName:"product",itemCost:1,productId:123}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addToCart Function receive productQuantityValue=10 should return true   ', () => {
    component.productQuantityValue=10;
    let result:boolean=true;
    expect(component.addToCart()).toBe(result);
  });

  it('addToCart Function receive productQuantityValue=0 should return true   ', () => {
    component.productQuantityValue=0;
    let result:boolean=true;
    expect(component.addToCart()).toBe(result);
  });

  it('addToCart Function receive productQuantityValue=-5 should return false   ', () => {
    component.productQuantityValue=-5;
    let result:boolean=false;
    expect(component.addToCart()).toBe(result);
  });

});
