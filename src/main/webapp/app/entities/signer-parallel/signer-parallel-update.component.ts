import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISignerParallel } from 'app/shared/model/signer-parallel.model';
import { SignerParallelService } from './signer-parallel.service';
import { ITransactionParallel } from 'app/shared/model/transaction-parallel.model';
import { TransactionParallelService } from 'app/entities/transaction-parallel';
import { IMetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';
import { MetaTransactionParallelService } from 'app/entities/meta-transaction-parallel';

@Component({
    selector: 'jhi-signer-parallel-update',
    templateUrl: './signer-parallel-update.component.html'
})
export class SignerParallelUpdateComponent implements OnInit {
    signer: ISignerParallel;
    isSaving: boolean;

    transactions: ITransactionParallel[];

    metatransactions: IMetaTransactionParallel[];
    birthDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected signerService: SignerParallelService,
        protected transactionService: TransactionParallelService,
        protected metaTransactionService: MetaTransactionParallelService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ signer }) => {
            this.signer = signer;
        });
        this.transactionService
            .query({ filter: 'signer-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ITransactionParallel[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITransactionParallel[]>) => response.body)
            )
            .subscribe(
                (res: ITransactionParallel[]) => {
                    if (!this.signer.transaction || !this.signer.transaction.id) {
                        this.transactions = res;
                    } else {
                        this.transactionService
                            .find(this.signer.transaction.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ITransactionParallel>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ITransactionParallel>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ITransactionParallel) => (this.transactions = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.metaTransactionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMetaTransactionParallel[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMetaTransactionParallel[]>) => response.body)
            )
            .subscribe(
                (res: IMetaTransactionParallel[]) => (this.metatransactions = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.signer.id !== undefined) {
            this.subscribeToSaveResponse(this.signerService.update(this.signer));
        } else {
            this.subscribeToSaveResponse(this.signerService.create(this.signer));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISignerParallel>>) {
        result.subscribe((res: HttpResponse<ISignerParallel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTransactionById(index: number, item: ITransactionParallel) {
        return item.id;
    }

    trackMetaTransactionById(index: number, item: IMetaTransactionParallel) {
        return item.id;
    }
}
