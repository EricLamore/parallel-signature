import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';

@Component({
    selector: 'jhi-meta-transaction-parallel-detail',
    templateUrl: './meta-transaction-parallel-detail.component.html'
})
export class MetaTransactionParallelDetailComponent implements OnInit {
    metaTransaction: IMetaTransactionParallel;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ metaTransaction }) => {
            this.metaTransaction = metaTransaction;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
