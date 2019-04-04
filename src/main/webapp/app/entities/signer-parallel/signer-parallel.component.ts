import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISignerParallel } from 'app/shared/model/signer-parallel.model';
import { AccountService } from 'app/core';
import { SignerParallelService } from './signer-parallel.service';

@Component({
    selector: 'jhi-signer-parallel',
    templateUrl: './signer-parallel.component.html'
})
export class SignerParallelComponent implements OnInit, OnDestroy {
    signers: ISignerParallel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected signerService: SignerParallelService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.signerService
            .query()
            .pipe(
                filter((res: HttpResponse<ISignerParallel[]>) => res.ok),
                map((res: HttpResponse<ISignerParallel[]>) => res.body)
            )
            .subscribe(
                (res: ISignerParallel[]) => {
                    this.signers = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSigners();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISignerParallel) {
        return item.id;
    }

    registerChangeInSigners() {
        this.eventSubscriber = this.eventManager.subscribe('signerListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
