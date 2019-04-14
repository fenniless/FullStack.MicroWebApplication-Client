// import { Component, OnInit } from '@angular/core';
//
// import { Transaction } from './transaction';
// import { TransactionService } from '../transaction.service';
//
// @Component({
//   selector: 'app-transaction',
//   templateUrl: './transaction.component.html',
//   styleUrls: ['./transaction.component.css']
// })
// export class TransactionComponent implements OnInit {
// 	transaction: Transaction[];
// //	transaction: Transaction = {
// //		transaction_id: 1,
// //		from_account_id: 2,
// //		to_account_id: 3,
// //		memo: "test",
// //		transaction_type: "test",
// //		transaction_dt: null,
// //		amount: 5.0,
// //	}
//
//   constructor(private transactionService: TransactionService) { }
//
//   ngOnInit() {
//   	this.getTransactions();
//   }
//
//   getTransactions(): void {
//   	this.transactionService.getTransactions()
//   	.subscribe(transaction => this.transaction = transaction);
//   }
//
// }
