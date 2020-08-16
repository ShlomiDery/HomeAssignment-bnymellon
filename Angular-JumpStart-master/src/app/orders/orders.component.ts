import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { ICustomer, IPagedResults, IOrder, IProduct } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoggerService } from '../core/services/logger.service';

@Component({
    selector: 'cm-customers-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']

})
export class OrdersComponent implements OnInit {
    customersPage: ICustomer[];
    customers: ICustomer[];

    totalRecords = 0;
    pageSize = 5;
    displayMode: DisplayModeEnum;
    displayModeEnum = DisplayModeEnum;
    productsCart:[IProduct, number][]=[];
    selected = 'null';

    constructor(private dataService: DataService,
         public trackbyService: TrackByService,
         private router:Router,
         private location :Location,
         private logger: LoggerService) { }

    ngOnInit() {
        this.getCustomersPage(1);
        this.displayMode = DisplayModeEnum.Details;
        this.dataService.getCustomers().subscribe((customers:ICustomer[])=>{
            this.customers=customers;
        },
        (err: any) => this.logger.log(err),() => this.logger.log('getCustomers() error'));
    }

    pageChanged(page: number) {
        this.getCustomersPage(page);
    }

    changeDisplayMode(mode: DisplayModeEnum) {
        this.displayMode = mode;
    }
    changeCustomer(){

        console.log(this.selected);
        
    }

    getCustomersPage(page: number) {
        this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe((response: IPagedResults<ICustomer[]>) => {
                this.totalRecords = response.totalRecords;
                this.customersPage = response.results;
            },
            (err: any) => this.logger.log(err),() => this.logger.log('getCustomersPage() retrieved customers for page: ' + page));
    }

    buyCart()
    {
        let customer:ICustomer=this.customers.find(customer=>customer.id==Number(this.selected));
        if (!customer) 
            alert('please enter a valid customer');
        else
        {
            if (this.productsCart[0]) {
                this.productsCart.forEach(pair=>{
                    for (let index = 0; index < pair[1]; index++) {
                      customer.orders.push(pair[0]);
                    }
                });
                this.dataService.updateCustomer(customer).subscribe(res=>{
                    this.location.back();
                },
                (err: any) => this.logger.log(err),() => this.logger.log('updateCustomer() error'));

            }
            else{
                alert('the order must include one or more products');
            }
        }
    }

    orderChanged(data:any)
    {
    this.productsCart=data;
    }

}
enum DisplayModeEnum {
    Details = 0,
    Add= 1,
  }
  