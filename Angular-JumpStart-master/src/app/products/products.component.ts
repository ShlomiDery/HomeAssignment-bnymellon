import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../core/services/data.service';
import { IProduct, IPagedResults } from '../shared/interfaces';
import { LoggerService } from '../core/services/logger.service';
import { FilterService } from '../core/services/filter.service';

@Component({
  selector: 'cm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:IProduct[];
totalRecords=0;
pageSize:number=10;
filteredProducts:IProduct[]=[];
productsCart:[IProduct, number][]=[];
@Output() orderChanged: EventEmitter<any> = new EventEmitter();

  constructor(private dataService: DataService,
    private logger: LoggerService,
    private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.getProductsPage(1);
  }

  pageChanged(page: number) {
    this.getProductsPage(page);
  }

  filterChanged(data: string) {
    if (data && this.products) {
        data = data.toUpperCase();
        const props = ['productName'];
        this.filteredProducts = this.filterService.filter<IProduct>(this.products, data, props);
    } else {
      this.filteredProducts = this.products;
    }
  }

  getProductsPage(page: number) {
    this.dataService.getProductsPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: any) => {
          this.totalRecords = response.totalRecords;
          this.products = this.filteredProducts=response.results;
        },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getCustomersPage() retrieved customers for page: ' + page));
  }

  cartChanged(productValues:any)
  {
    if (this.productsCart.length==0) {
      this.productsCart.push([productValues.product,productValues.productQuantity])
    }
    
    else{
     let productExist:Boolean=this.productsCart.some(element => {
        if (element[0].productId == productValues.product.productId) {
            return true 
        } else {
            return false 
        }
      })
      if (productExist) {
      this.productsCart.forEach(element => {
        if (element[0].productId==productValues.product.productId) {
          element[1]=productValues.productQuantity;
        }
      });
    }
      else{
        this.productsCart.push([productValues.product,productValues.productQuantity])
      }
    }
    this.orderChanged.emit(this.productsCart);
  }
}
