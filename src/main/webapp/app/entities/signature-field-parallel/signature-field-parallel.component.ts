import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ISignatureFieldParallel } from 'app/shared/model/signature-field-parallel.model';
import { AccountService } from 'app/core';
import { SignatureFieldParallelService } from './signature-field-parallel.service';

@Component({
    selector: 'jhi-signature-field-parallel',
    templateUrl: './signature-field-parallel.component.html'
})
export class SignatureFieldParallelComponent implements OnInit, OnDestroy {
    signatureFields: ISignatureFieldParallel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected signatureFieldService: SignatureFieldParallelService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.signatureFieldService
            .query()
            .pipe(
                filter((res: HttpResponse<ISignatureFieldParallel[]>) => res.ok),
                map((res: HttpResponse<ISignatureFieldParallel[]>) => res.body)
            )
            .subscribe(
                (res: ISignatureFieldParallel[]) => {
                    this.signatureFields = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSignatureFields();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISignatureFieldParallel) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInSignatureFields() {
        this.eventSubscriber = this.eventManager.subscribe('signatureFieldListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
