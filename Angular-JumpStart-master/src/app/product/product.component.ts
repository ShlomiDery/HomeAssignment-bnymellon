import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICustomer, IProduct } from '../shared/interfaces';

@Component({
  selector: 'cm-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
@Input() product:IProduct;
productQuantityValue:number=0;
productToBuy:boolean;
productQuantityView=0;
@Output() cartChanged: EventEmitter<{product: IProduct, productQuantity: number}> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.productToBuy=false;
  }

  quantityChanged(event)
  {
    console.log(event);
  }

  BuyProductState()
  {
    this.productToBuy=!this.productToBuy;
  }

  addToCart():boolean
  {
    if (Number.isInteger(Number(this.productQuantityValue))) {
      console.log(Math.sign(Number(this.productQuantityValue)));
      
      if ((Math.sign(Number(this.productQuantityValue))==1)||(Math.sign(Number(this.productQuantityValue))==0)) {
        if ((this.productQuantityValue.toString().length>1) && (this.productQuantityValue.toString().charAt(0)=='0')) {
          alert("validation error: range between 0 to 1000");
          return false
        }
        else{
          this.productQuantityView=this.productQuantityValue;
            this.cartChanged.emit({product:this.product,productQuantity:this.productQuantityValue});
            return true;
        }
      }
      else{
        alert("validation error: please enter only positive number");
        this.productQuantityValue=0;
        return false;
      }
    }
    else{
      alert("validation error: please enter a number");
      this.productQuantityValue=0;
      return false;
    }
  }

 

}
