import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITransactionParallel } from 'app/shared/model/transaction-parallel.model';
import { TransactionParallelService } from './transaction-parallel.service';
import { ISignerParallel } from 'app/shared/model/signer-parallel.model';
import { SignerParallelService } from 'app/entities/signer-parallel';

@Component({
    selector: 'jhi-transaction-parallel-update',
    templateUrl: './transaction-parallel-update.component.html'
})
export class TransactionParallelUpdateComponent implements OnInit {
    transaction: ITransactionParallel;
    isSaving: boolean;

    signers: ISignerParallel[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected transactionService: TransactionParallelService,
        protected signerService: SignerParallelService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transaction }) => {
            this.transaction = transaction;
        });
        this.signerService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISignerParallel[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISignerParallel[]>) => response.body)
            )
            .subscribe((res: ISignerParallel[]) => (this.signers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transaction.id !== undefined) {
            this.subscribeToSaveResponse(this.transactionService.update(this.transaction));
        } else {
            this.subscribeToSaveResponse(this.transactionService.create(this.transaction));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionParallel>>) {
        result.subscribe((res: HttpResponse<ITransactionParallel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSignerById(index: number, item: ISignerParallel) {
        return item.id;
    }
}
