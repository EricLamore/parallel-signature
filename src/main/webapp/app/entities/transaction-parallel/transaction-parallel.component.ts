import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransactionParallel } from 'app/shared/model/transaction-parallel.model';
import { AccountService } from 'app/core';
import { TransactionParallelService } from './transaction-parallel.service';

@Component({
    selector: 'jhi-transaction-parallel',
    templateUrl: './transaction-parallel.component.html'
})
export class TransactionParallelComponent implements OnInit, OnDestroy {
    transactions: ITransactionParallel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected transactionService: TransactionParallelService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.transactionService
            .query()
            .pipe(
                filter((res: HttpResponse<ITransactionParallel[]>) => res.ok),
                map((res: HttpResponse<ITransactionParallel[]>) => res.body)
            )
            .subscribe(
                (res: ITransactionParallel[]) => {
                    this.transactions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTransactions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransactionParallel) {
        return item.id;
    }

    registerChangeInTransactions() {
        this.eventSubscriber = this.eventManager.subscribe('transactionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
