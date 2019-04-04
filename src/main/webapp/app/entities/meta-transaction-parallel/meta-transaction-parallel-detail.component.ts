import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';

@Component({
    selector: 'jhi-meta-transaction-parallel-detail',
    templateUrl: './meta-transaction-parallel-detail.component.html'
})
export class MetaTransactionParallelDetailComponent implements OnInit {
    metaTransaction: IMetaTransactionParallel;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ metaTransaction }) => {
            this.metaTransaction = metaTransaction;
        });
    }

    previousState() {
        window.history.back();
    }
}
