import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IDocumentsParallel } from 'app/shared/model/documents-parallel.model';
import { DocumentsParallelService } from './documents-parallel.service';
import { IMetaTransactionParallel } from 'app/shared/model/meta-transaction-parallel.model';
import { MetaTransactionParallelService } from 'app/entities/meta-transaction-parallel';

@Component({
    selector: 'jhi-documents-parallel-update',
    templateUrl: './documents-parallel-update.component.html'
})
export class DocumentsParallelUpdateComponent implements OnInit {
    documents: IDocumentsParallel;
    isSaving: boolean;

    metatransactions: IMetaTransactionParallel[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected documentsService: DocumentsParallelService,
        protected metaTransactionService: MetaTransactionParallelService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ documents }) => {
            this.documents = documents;
        });
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

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.documents.id !== undefined) {
            this.subscribeToSaveResponse(this.documentsService.update(this.documents));
        } else {
            this.subscribeToSaveResponse(this.documentsService.create(this.documents));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentsParallel>>) {
        result.subscribe((res: HttpResponse<IDocumentsParallel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMetaTransactionById(index: number, item: IMetaTransactionParallel) {
        return item.id;
    }
}
