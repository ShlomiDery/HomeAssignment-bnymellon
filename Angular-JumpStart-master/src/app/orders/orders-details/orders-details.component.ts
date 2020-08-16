import { Component, OnInit, Input } from '@angular/core';
import { ICustomer, IPagedResults } from 'src/app/shared/interfaces';
import { TrackByService } from 'src/app/core/services/trackby.service';
import { DataService } from 'src/app/core/services/data.service';
import { LoggerService } from 'src/app/core/services/logger.service';

@Component({
  selector: 'cm-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit {
  @Input() customers: ICustomer[] = [];
  totalRecords = 0;
  pageSize = 5;
  constructor(private dataService: DataService,
     public trackbyService: TrackByService,
      private logger: LoggerService) { }

  pageChanged(page: number) {
    this.getCustomersPage(page);
}

getCustomersPage(page: number) {
    this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<ICustomer[]>) => {
            this.totalRecords = response.totalRecords;
            this.customers = response.results;
        },(err: any) => this.logger.log(err),() => this.logger.log('getCustomersPage() retrieved customers for page: ' + page));
}

  ngOnInit(): void {
    this.getCustomersPage(1);
  }

}
