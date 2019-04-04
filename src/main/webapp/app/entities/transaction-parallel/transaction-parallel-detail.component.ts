import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionParallel } from 'app/shared/model/transaction-parallel.model';

@Component({
    selector: 'jhi-transaction-parallel-detail',
    templateUrl: './transaction-parallel-detail.component.html'
})
export class TransactionParallelDetailComponent implements OnInit {
    transaction: ITransactionParallel;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transaction }) => {
            this.transaction = transaction;
        });
    }

    previousState() {
        window.history.back();
    }
}
