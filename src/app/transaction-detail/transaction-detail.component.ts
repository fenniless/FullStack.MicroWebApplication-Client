// import { Component, Input, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
// import { Transaction } from '../transaction';
// import { TransactionService} from '../transaction.service';
//
// @Component({
//   selector: 'app-transaction-detail',
//   templateUrl: './transaction-detail.component.html',
//   styleUrls: ['./transaction-detail.component.css']
// })
// export class TransactionDetailComponent implements OnInit {
//
//   @Input() transaction: Transaction;
//   constructor(private route: ActivatedRoute,
//               private transactionService: TransactionService,
//               private location: Location
//   ) { }
//
//   ngOnInit(): void {
//     this.getTransaction();
//   }
//   getTransaction(): void {
//     const id = +this.route.snapshot.paramMap.get('id');
//     this.transactionService.getTransactions()
//   }
//
// }
