import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';
import { MetaTransactionParallelService } from './meta-transaction-parallel.service';

@Component({
    selector: 'jhi-meta-transaction-parallel-update',
    templateUrl: './meta-transaction-parallel-update.component.html'
})
export class MetaTransactionParallelUpdateComponent implements OnInit {
    metaTransaction: IMetaTransactionParallel;
    isSaving: boolean;

    constructor(protected metaTransactionService: MetaTransactionParallelService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ metaTransaction }) => {
            this.metaTransaction = metaTransaction;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.metaTransaction.id !== undefined) {
            this.subscribeToSaveResponse(this.metaTransactionService.update(this.metaTransaction));
        } else {
            this.subscribeToSaveResponse(this.metaTransactionService.create(this.metaTransaction));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetaTransactionParallel>>) {
        result.subscribe(
            (res: HttpResponse<IMetaTransactionParallel>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
